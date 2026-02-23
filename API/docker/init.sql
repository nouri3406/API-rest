-- =========================
-- Tables JOBBOARD (v1)
-- =========================

CREATE TABLE IF NOT EXISTS People (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  mail TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  adress TEXT NOT NULL,
  city TEXT NOT NULL,
  user_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  siret TEXT UNIQUE NOT NULL,
  mail TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  business_sector TEXT NOT NULL,
  headquarters TEXT NOT NULL,
  web_site TEXT NOT NULL,
  description TEXT,
  user_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Advertisements (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  job_name TEXT NOT NULL,
  contract_type TEXT NOT NULL,
  business_sector TEXT NOT NULL,
  salary TEXT,
  city TEXT NOT NULL,
  adress TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  mail TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  advertisement_id INTEGER NOT NULL REFERENCES Advertisements(id) ON DELETE CASCADE,
  user_id INTEGER,
  application_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_app_per_user_per_ad
ON Applications(advertisement_id, user_id);