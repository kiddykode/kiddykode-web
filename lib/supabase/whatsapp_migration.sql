-- ============================================
-- KiddyKode WhatsApp Automation Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. WhatsApp Scheduled / Retry Jobs Queue
CREATE TABLE IF NOT EXISTS whatsapp_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  run_at TIMESTAMPTZ DEFAULT now(),
  locked_at TIMESTAMPTZ,
  locked_by TEXT,
  dedupe_key TEXT,
  last_error TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Unique index for job deduplication
CREATE UNIQUE INDEX IF NOT EXISTS idx_whatsapp_jobs_dedupe 
  ON whatsapp_jobs (dedupe_key) 
  WHERE status IN ('pending', 'processing');

-- 2. WhatsApp Message Logs (Audit trail for inbound/outbound)
CREATE TABLE IF NOT EXISTS whatsapp_message_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  wa_message_id TEXT,
  contact_identifier TEXT,
  normalized_phone TEXT NOT NULL,
  template_key TEXT,
  dedupe_key TEXT,
  status TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unique index to prevent duplicate outbound messages
CREATE UNIQUE INDEX IF NOT EXISTS idx_whatsapp_logs_dedupe 
  ON whatsapp_message_logs (dedupe_key) 
  WHERE dedupe_key IS NOT NULL;

-- 3. FAQ Templates for Auto-Replies
CREATE TABLE IF NOT EXISTS faq_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  response_text TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. WhatsApp Key-Value Settings Table
CREATE TABLE IF NOT EXISTS whatsapp_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Class Sessions (for Automated Reminders)
CREATE TABLE IF NOT EXISTS class_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_name TEXT NOT NULL DEFAULT 'Cohort 03',
  title TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Extensions to existing cohort_registrations table
ALTER TABLE cohort_registrations 
  ADD COLUMN IF NOT EXISTS guardian_phone TEXT;

ALTER TABLE cohort_registrations 
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded'));

ALTER TABLE cohort_registrations 
  ADD COLUMN IF NOT EXISTS payment_reminders_sent INTEGER DEFAULT 0;

-- 7. PL/pgSQL function to claim jobs safely using FOR UPDATE SKIP LOCKED
CREATE OR REPLACE FUNCTION claim_next_whatsapp_job(worker_id TEXT)
RETURNS SETOF whatsapp_jobs AS $$
DECLARE
  claimed_job whatsapp_jobs;
BEGIN
  UPDATE whatsapp_jobs
  SET 
    status = 'processing',
    locked_by = worker_id,
    locked_at = now(),
    attempts = attempts + 1,
    updated_at = now()
  WHERE id = (
    SELECT id
    FROM whatsapp_jobs
    WHERE status = 'pending'
      AND run_at <= now()
      AND (locked_at IS NULL OR locked_at < now() - INTERVAL '5 minutes') -- Reclaim stale locks
    ORDER BY run_at ASC, created_at ASC
    LIMIT 1
    FOR UPDATE SKIP LOCKED
  )
  RETURNING * INTO claimed_job;

  IF FOUND THEN
    RETURN NEXT claimed_job;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 8. PL/pgSQL function to increment payment reminders safely
CREATE OR REPLACE FUNCTION increment_payment_reminders(reg_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE cohort_registrations
  SET payment_reminders_sent = payment_reminders_sent + 1
  WHERE id = reg_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

ALTER TABLE whatsapp_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_message_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_sessions ENABLE ROW LEVEL SECURITY;

-- Grant service role full access
CREATE POLICY "Service role full access on whatsapp_jobs"
  ON whatsapp_jobs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on whatsapp_message_logs"
  ON whatsapp_message_logs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on faq_templates"
  ON faq_templates FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on whatsapp_settings"
  ON whatsapp_settings FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on class_sessions"
  ON class_sessions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
