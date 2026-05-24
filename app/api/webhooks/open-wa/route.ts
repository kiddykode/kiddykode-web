import { NextRequest, NextResponse } from 'next/server';
import { processInboundMessage } from '@/lib/whatsapp/service';

export async function POST(req: NextRequest) {
  try {
    // Optional Webhook secret validation
    const { searchParams } = new URL(req.url);
    const secretParam = searchParams.get('secret');
    const expectedSecret = process.env.WHATSAPP_API_KEY;

    if (expectedSecret && secretParam !== expectedSecret) {
      console.warn('[WhatsApp Webhook] Unauthorized request received. Invalid secret query parameter.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    console.log('[WhatsApp Webhook] Received webhook event:', JSON.stringify(body).substring(0, 300));

    // open-wa Easy API wraps the message in { event: 'onMessage', data: message } or sends it directly.
    let message: any = null;

    if (body.event === 'onMessage' && body.data) {
      message = body.data;
    } else if (body.from && body.body) {
      message = body;
    }

    if (!message) {
      // Event is not a message (could be onAck, onStateChange, etc.). We return 200 OK.
      return NextResponse.json({ status: 'ignored', message: 'Not an onMessage event' });
    }

    // Process the inbound message asynchronously (non-blocking for the response)
    // In Vercel serverless, we must await the processing to ensure it completes before the function finishes.
    await processInboundMessage({
      id: message.id,
      from: message.from,
      body: message.body,
      sender: message.sender,
    });

    return NextResponse.json({ status: 'processed' });
  } catch (error: any) {
    console.error('[WhatsApp Webhook] Exception occurred processing webhook:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
