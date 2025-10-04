/*
  # Add Advanced Features Tables

  1. New Tables
    - `waitlist_signups`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text, unique, required) - User email
      - `name` (text) - User name
      - `city` (text) - User city
      - `referral_code` (text, unique) - User's unique referral code
      - `referred_by` (uuid) - ID of referrer
      - `referral_count` (integer, default 0) - Number of successful referrals
      - `created_at` (timestamptz) - Signup timestamp

    - `city_votes`
      - `id` (uuid, primary key) - Unique identifier
      - `city_name` (text, required) - City name
      - `vote_count` (integer, default 0) - Number of votes
      - `country` (text) - Country name
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `activity_votes`
      - `id` (uuid, primary key) - Unique identifier
      - `activity_name` (text, required) - Activity name
      - `category` (text, required) - Activity category
      - `vote_count` (integer, default 0) - Number of votes
      - `created_at` (timestamptz) - Creation timestamp

    - `quiz_results`
      - `id` (uuid, primary key) - Unique identifier
      - `email` (text) - User email
      - `personality_type` (text, required) - Quiz result type
      - `answers` (jsonb) - Quiz answers
      - `created_at` (timestamptz) - Completion timestamp

  2. Security
    - Enable RLS on all tables
    - Allow public inserts for signups and votes
    - Allow public reads for aggregated data

  3. Indexes
    - Index on email, referral_code, city for fast lookups
    - Index on vote counts for leaderboards
*/

-- Create waitlist signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  city text,
  referral_code text UNIQUE NOT NULL,
  referred_by uuid REFERENCES waitlist_signups(id),
  referral_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create city votes table
CREATE TABLE IF NOT EXISTS city_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name text NOT NULL UNIQUE,
  vote_count integer DEFAULT 0,
  country text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activity votes table
CREATE TABLE IF NOT EXISTS activity_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_name text NOT NULL,
  category text NOT NULL,
  vote_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(activity_name, category)
);

-- Create quiz results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text,
  personality_type text NOT NULL,
  answers jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
CREATE POLICY "Anyone can insert waitlist signup"
  ON waitlist_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read waitlist signups"
  ON waitlist_signups
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update referral counts"
  ON waitlist_signups
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- City votes policies
CREATE POLICY "Anyone can read city votes"
  ON city_votes
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert city votes"
  ON city_votes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update city votes"
  ON city_votes
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Activity votes policies
CREATE POLICY "Anyone can read activity votes"
  ON activity_votes
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert activity votes"
  ON activity_votes
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update activity votes"
  ON activity_votes
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Quiz results policies
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist_signups(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_city ON waitlist_signups(city);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_count ON waitlist_signups(referral_count DESC);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_signups(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_city_votes_count ON city_votes(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_activity_votes_count ON activity_votes(vote_count DESC);

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS text AS $$
DECLARE
  characters text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(characters, floor(random() * length(characters) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to update city vote updated_at
CREATE OR REPLACE FUNCTION update_city_votes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for city votes updated_at
CREATE TRIGGER update_city_votes_timestamp
  BEFORE UPDATE ON city_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_city_votes_updated_at();
