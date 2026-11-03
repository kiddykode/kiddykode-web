-- ============================================
-- Add "learning goal" field to cohort_registrations
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

ALTER TABLE cohort_registrations
  ADD COLUMN IF NOT EXISTS learning_goal TEXT CHECK (
    learning_goal IN (
      'creativity_problem_solving',
      'logical_thinking',
      'tech_projects',
      'confidence_expression',
      'future_opportunities',
      'combination'
    )
  );
