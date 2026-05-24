import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { sendPaymentReminderDirect, sendClassReminderDirect } from '@/lib/whatsapp/service';

export async function GET(req: NextRequest) {
  try {
    // Optional secret key validation to prevent unauthorized trigger
    const { searchParams } = new URL(req.url);
    const cronSecret = searchParams.get('secret');
    const expectedSecret = process.env.CRON_SECRET || process.env.WHATSAPP_API_KEY;

    if (expectedSecret && cronSecret !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[Cron Reminders] Starting process-reminders cron execution...');
    const now = new Date();

    // ────────────────────────────────────────────
    // 1. Process Payment Reminders
    // ────────────────────────────────────────────
    // Limit reminders: 
    // - Reminder 1: sent if registration is > 48 hours old and reminders = 0
    // - Reminder 2: sent if registration is > 120 hours (5 days) old and reminders = 1
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();

    const { data: firstReminders, error: err1 } = await supabase
      .from('cohort_registrations')
      .select('*')
      .eq('payment_status', 'unpaid')
      .eq('payment_reminders_sent', 0)
      .lt('created_at', fortyEightHoursAgo);

    const { data: secondReminders, error: err2 } = await supabase
      .from('cohort_registrations')
      .select('*')
      .eq('payment_status', 'unpaid')
      .eq('payment_reminders_sent', 1)
      .lt('created_at', fiveDaysAgo);

    if (err1) console.error('[Cron Reminders] Error loading first reminders:', err1);
    if (err2) console.error('[Cron Reminders] Error loading second reminders:', err2);

    const dueReminders = [
      ...(firstReminders || []).map(r => ({ ...r, reminderNumber: 1 })),
      ...(secondReminders || []).map(r => ({ ...r, reminderNumber: 2 }))
    ];

    console.log(`[Cron Reminders] Found ${dueReminders.length} pending payment reminders.`);
    let paymentSentCount = 0;

    for (const reg of dueReminders) {
      if (!reg.guardian_phone) continue;
      
      const success = await sendPaymentReminderDirect(
        reg.id,
        reg.guardian_phone,
        reg.guardian_name,
        reg.child_name,
        reg.cohort_name,
        reg.reminderNumber
      );
      if (success) paymentSentCount++;
    }

    // ────────────────────────────────────────────
    // 2. Process Class Reminders
    // ────────────────────────────────────────────
    // Find class sessions starting in the next 24 hours that haven't had reminders sent
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    const { data: upcomingClasses, error: classErr } = await supabase
      .from('class_sessions')
      .select('*')
      .eq('reminder_sent', false)
      .lte('start_time', twentyFourHoursFromNow)
      .gte('start_time', now.toISOString());

    if (classErr) console.error('[Cron Reminders] Error loading upcoming classes:', classErr);

    console.log(`[Cron Reminders] Found ${upcomingClasses?.length || 0} upcoming classes due for reminders.`);
    let classSentCount = 0;

    if (upcomingClasses && upcomingClasses.length > 0) {
      for (const session of upcomingClasses) {
        // Find all confirmed registrations for this cohort
        const { data: registrants, error: regErr } = await supabase
          .from('cohort_registrations')
          .select('*')
          .eq('cohort_name', session.cohort_name)
          .eq('status', 'confirmed');

        if (regErr) {
          console.error(`[Cron Reminders] Error loading registrants for cohort ${session.cohort_name}:`, regErr);
          continue;
        }

        if (registrants && registrants.length > 0) {
          for (const reg of registrants) {
            if (!reg.guardian_phone) continue;
            
            const success = await sendClassReminderDirect(
              reg.id,
              reg.guardian_phone,
              reg.guardian_name,
              reg.child_name,
              session.title,
              session.start_time
            );
            if (success) classSentCount++;
          }
        }

        // Mark the class reminder as sent
        await supabase
          .from('class_sessions')
          .update({ reminder_sent: true })
          .eq('id', session.id);
      }
    }

    return NextResponse.json({
      status: 'success',
      paymentRemindersProcessed: dueReminders.length,
      paymentRemindersSent: paymentSentCount,
      classRemindersSent: classSentCount,
    });
  } catch (error: any) {
    console.error('[Cron Reminders] Unhandled exception occurred:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
