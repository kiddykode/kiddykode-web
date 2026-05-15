-- ============================================
-- KiddyKode Backend Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  intent TEXT NOT NULL CHECK (intent IN ('parent', 'school', 'partner', 'other')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  consent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'footer' CHECK (source IN ('footer', 'stories', 'cohort', 'homepage')),
  locale TEXT DEFAULT 'en',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- 3. Cohort Registrations
CREATE TABLE IF NOT EXISTS cohort_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cohort_name TEXT NOT NULL DEFAULT 'Cohort 03',
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL CHECK (child_age >= 5 AND child_age <= 18),
  guardian_name TEXT NOT NULL,
  guardian_email TEXT NOT NULL,
  city TEXT NOT NULL,
  referral_source TEXT CHECK (referral_source IN ('social_media', 'school', 'friend', 'website', 'other')),
  consent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'waitlisted', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Unique constraint: one registration per email per cohort
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_cohort_registration
  ON cohort_registrations (guardian_email, cohort_name);

-- ============================================
-- Row Level Security
-- ============================================

-- Enable RLS on all tables
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohort_registrations ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the service role (Server Actions use service role key)
-- No public read access — data is only viewable in the Supabase dashboard
CREATE POLICY "Service role full access on contact_submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on newsletter_subscribers"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on cohort_registrations"
  ON cohort_registrations FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
