-- 805Returns waitlist + funnel schema (Cloudflare D1 / SQLite)
-- Apply locally:  npm run db:migrate:local
-- Apply remote:   npm run db:migrate:remote

CREATE TABLE IF NOT EXISTS signups (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  email             TEXT NOT NULL,
  zip               TEXT,
  plan              TEXT,             -- which price tier they said they'd pick
  returns_per_month TEXT,            -- self-reported return volume
  referrer          TEXT,
  user_agent        TEXT,
  utm_source        TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
CREATE INDEX IF NOT EXISTS idx_signups_plan ON signups(plan);

-- Lightweight funnel events (e.g. plan_click, waitlist_open) for measuring
-- willingness-to-pay before anyone even submits the form.
CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  event      TEXT NOT NULL,
  plan       TEXT,
  meta       TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
