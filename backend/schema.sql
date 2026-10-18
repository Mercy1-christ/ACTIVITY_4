CREATE TABLE campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_name VARCHAR(150) NOT NULL,
  cause VARCHAR(100),
  description TEXT,
  location VARCHAR(100),
  organizer VARCHAR(100),
  start_date VARCHAR(20),
  end_date VARCHAR(20),
  target_amount INTEGER,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);