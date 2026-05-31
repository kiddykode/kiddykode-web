-- ============================================
-- KiddyKode Certificate Metadata Update
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- Update the existing sample certificate's metadata with the digital signature URLs
UPDATE certificates
SET metadata = jsonb_build_object(
  'instructor_name', 'Dedoatus Buengsi',
  'director_name', 'Chiella Harriet',
  'instructor_signature_url', '/signatures/instructor-dedoatus.svg',
  'director_signature_url', '/signatures/director-chiella.svg',
  'grade', 'A+',
  'score', '95%'
)
WHERE public_token = 'sample-explorer-live';

-- Verification selection to check if the update was successful
SELECT 
  recipient_name, 
  course_title, 
  certificate_number, 
  metadata->>'instructor_name' AS instructor,
  metadata->>'director_name' AS director,
  metadata->>'instructor_signature_url' AS instructor_sig,
  metadata->>'director_signature_url' AS director_sig
FROM certificates 
WHERE public_token = 'sample-explorer-live';
