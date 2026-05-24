import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { sendWhatsAppMessage } from '@/lib/whatsapp/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cronSecret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET || process.env.WHATSAPP_API_KEY;

    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Cron Retries] Starting process-retries cron execution...');
    const workerId = `vercel_cron_${Math.random().toString(36).substring(2, 10)}`;
    const maxJobsToProcess = 5;
    let processedCount = 0;
    let successCount = 0;

    for (let i = 0; i < maxJobsToProcess; i++) {
      // Claim the next job safely using Postgres FOR UPDATE SKIP LOCKED function
      const { data: claimedJobs, error: claimError } = await supabase.rpc('claim_next_whatsapp_job', {
        worker_id: workerId,
      });

      if (claimError) {
        console.error('[Cron Retries] Error claiming next job:', claimError);
        break;
      }

      if (!claimedJobs || claimedJobs.length === 0) {
        // No more pending jobs
        break;
      }

      const job = claimedJobs[0];
      processedCount++;
      console.log(`[Cron Retries] Claimed job ${job.id} of type ${job.job_type}. Attempt ${job.attempts}/${job.max_attempts}`);

      let executionSuccess = false;
      let errorMsg = '';
      let msgId = '';

      try {
        if (job.job_type === 'welcome') {
          const { phone, guardianName, childName, program } = job.payload;
          const text = `Hi ${guardianName}! 🎉 Welcome to KiddyKode. We are excited to have ${childName} join us for the ${program}! We will share onboarding details and next steps shortly. Feel free to ask any questions here!`;
          
          const result = await sendWhatsAppMessage(phone, text);
          if (result.success) {
            executionSuccess = true;
            msgId = result.messageId || '';
          } else {
            errorMsg = result.error || 'Failed to send WhatsApp message';
          }
        } else {
          errorMsg = `Unknown job type: ${job.job_type}`;
        }
      } catch (ex: any) {
        errorMsg = ex.message || 'Exception during execution';
      }

      const now = new Date().toISOString();

      if (executionSuccess) {
        successCount++;
        // Update job to completed
        await supabase
          .from('whatsapp_jobs')
          .update({
            status: 'completed',
            locked_by: null,
            locked_at: null,
            updated_at: now,
          })
          .eq('id', job.id);
        
        console.log(`[Cron Retries] Job ${job.id} completed successfully.`);
      } else {
        console.warn(`[Cron Retries] Job ${job.id} execution failed: ${errorMsg}`);

        if (job.attempts >= job.max_attempts) {
          // Mark job as failed permanently
          await supabase
            .from('whatsapp_jobs')
            .update({
              status: 'failed',
              last_error: errorMsg,
              locked_by: null,
              locked_at: null,
              updated_at: now,
            })
            .eq('id', job.id);
          
          console.error(`[Cron Retries] Job ${job.id} has reached maximum attempts (${job.max_attempts}) and is marked failed.`);
        } else {
          // Exponential backoff: retry in (attempts * 2 minutes)
          const backoffMinutes = job.attempts * 2;
          const nextRun = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();

          await supabase
            .from('whatsapp_jobs')
            .update({
              status: 'pending',
              last_error: errorMsg,
              run_at: nextRun,
              locked_by: null,
              locked_at: null,
              updated_at: now,
            })
            .eq('id', job.id);
          
          console.log(`[Cron Retries] Job ${job.id} rescheduled for ${nextRun} (backoff: ${backoffMinutes}m).`);
        }
      }
    }

    return NextResponse.json({
      status: 'success',
      processed: processedCount,
      succeeded: successCount,
    });
  } catch (error: any) {
    console.error('[Cron Retries] Unhandled exception occurred:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
