/*
  # Add additional_context column to consultation_leads

  ## Changes
  - Adds `additional_context` (text, nullable) to store the optional free-text input from candidates
  - Renames payment reference column to be PayU-compatible
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'consultation_leads' AND column_name = 'additional_context'
  ) THEN
    ALTER TABLE consultation_leads ADD COLUMN additional_context text DEFAULT '';
  END IF;
END $$;
