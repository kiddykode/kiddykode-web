-- ============================================
-- KiddyKode Certificate Verification Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Programs lookup table (drives the dropdown in the admin UI)
CREATE TABLE IF NOT EXISTS certificate_programs (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL,          -- e.g. "Explorer Live — Cohort 03"
  slug        TEXT UNIQUE NOT NULL,          -- e.g. "explorer-live-c03"
  level       TEXT,                          -- e.g. "Beginner", "Intermediate"
  active      BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Seed with current programs
INSERT INTO certificate_programs (name, slug, level) VALUES
  ('Explorer Live — Cohort 03',   'explorer-live-c03',   'Beginner'),
  ('Explorer Live — Cohort 04',   'explorer-live-c04',   'Beginner'),
  ('Young Innovators Lab (YIL)',   'yil',                 'Advanced'),
  ('Portfolio Program',            'portfolio',           'Intermediate')
ON CONFLICT (slug) DO NOTHING;


-- Main certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Public-facing verification token (URL-safe slug derived from UUID)
  public_token       TEXT UNIQUE NOT NULL,

  -- Human-readable certificate number (e.g. KK-2026-000001)
  certificate_number TEXT UNIQUE,

  -- Recipient
  recipient_name     TEXT NOT NULL,
  recipient_email    TEXT,

  -- Program info
  program_id         UUID REFERENCES certificate_programs(id) ON DELETE SET NULL,
  course_title       TEXT NOT NULL,           -- denormalized snapshot at issue time
  cohort_name        TEXT,
  level              TEXT,

  -- Dates
  issued_at          TIMESTAMPTZ DEFAULT now(),
  expires_at         TIMESTAMPTZ,             -- NULL = does not expire

  -- Status lifecycle
  status             TEXT DEFAULT 'valid'
                       CHECK (status IN ('valid', 'revoked', 'replaced', 'expired')),
  revoked_at         TIMESTAMPTZ,
  revoke_reason      TEXT,
  replaced_by        UUID REFERENCES certificates(id) ON DELETE SET NULL,

  -- Extras
  metadata           JSONB DEFAULT '{}',      -- grade, instructor, score, etc.
  pdf_url            TEXT,                    -- link to generated PDF (Phase 2)

  -- Audit
  created_at         TIMESTAMPTZ DEFAULT now(),
  updated_at         TIMESTAMPTZ DEFAULT now()
);

-- Fast token lookup (used on every verification page load)
CREATE UNIQUE INDEX IF NOT EXISTS idx_certificates_public_token
  ON certificates(public_token);

-- Index for admin list queries
CREATE INDEX IF NOT EXISTS idx_certificates_status
  ON certificates(status, issued_at DESC);

CREATE INDEX IF NOT EXISTS idx_certificates_recipient
  ON certificates(recipient_name);


-- ============================================
-- Auto-increment certificate number
-- ============================================
CREATE SEQUENCE IF NOT EXISTS certificate_number_seq START 1;

CREATE OR REPLACE FUNCTION assign_certificate_number()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.certificate_number IS NULL THEN
    NEW.certificate_number :=
      'KK-' || to_char(CURRENT_DATE, 'YYYY') ||
      '-' || lpad(nextval('certificate_number_seq')::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_certificate_number ON certificates;
CREATE TRIGGER trg_certificate_number
  BEFORE INSERT ON certificates
  FOR EACH ROW EXECUTE FUNCTION assign_certificate_number();


-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_certificates_updated_at ON certificates;
CREATE TRIGGER trg_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificate_programs ENABLE ROW LEVEL SECURITY;

-- Public: anyone can SELECT certificates (needed for unauthenticated verification page)
CREATE POLICY "Public read certificates"
  ON certificates FOR SELECT
  USING (true);

-- Public: anyone can SELECT programs (needed for verification page labels)
CREATE POLICY "Public read certificate_programs"
  ON certificate_programs FOR SELECT
  USING (true);

-- Write access: service role only
CREATE POLICY "Service role full access on certificates"
  ON certificates FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role full access on certificate_programs"
  ON certificate_programs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
