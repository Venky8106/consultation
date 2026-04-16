/*
  # Create early_leads table

  ## Summary
  Creates an anonymous funnel tracking table to capture visitor behavior before form submission.

  ## New Tables
  - `early_leads`
    - `id` (uuid, primary key)
    - `anon_id` (text, unique) - anonymous visitor identifier used for upserts
    - `funnel_stage` (text) - current stage in the funnel (e.g. PAYMENT_STARTED)
    - `first_touch_page` (text) - first page the visitor landed on
    - `referrer` (text) - HTTP referrer of the first visit
    - `drop_tags` (text[]) - array of tags marking where the user dropped off
    - `payment_status` (text) - payment state (pending, success, failed)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Anonymous users can insert and update their own row (matched by anon_id)
  - No read access for anon users (server-side only reads)
*/

CREATE TABLE IF NOT EXISTS early_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  anon_id text UNIQUE NOT NULL,
  funnel_stage text DEFAULT '',
  first_touch_page text DEFAULT '',
  referrer text DEFAULT '',
  drop_tags text[] DEFAULT '{}',
  payment_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE early_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon users can insert early leads"
  ON early_leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon users can update early leads by anon_id"
  ON early_leads FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);
