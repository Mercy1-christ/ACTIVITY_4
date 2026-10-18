const Database = require('better-sqlite3');
const db = new Database('ngo.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_name VARCHAR(150) NOT NULL,
    cause VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    organizer VARCHAR(100),
    start_date VARCHAR(20),
    end_date VARCHAR(20),
    target_amount INTEGER,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

// Auto-seed 10 records
const count = db.prepare('SELECT COUNT(*) as c FROM campaigns').get().c;
if (count === 0) {
  db.exec(`
    INSERT INTO campaigns (campaign_name, cause, description, location, organizer, start_date, end_date, target_amount, status) VALUES
    ('Clean Water Drive', 'Water & Sanitation', 'Provide boreholes in rural areas', 'Kabwe', 'Mulungushi Red Cross', '2026-01-10', '2026-03-10', 5000, 'Active'),
    ('Education For All', 'Education', 'School supplies for orphans', 'Kitwe', 'Hope Foundation', '2026-02-01', '2026-06-01', 3000, 'Active'),
    ('Plant A Tree', 'Environment', 'Plant 1000 trees on campus', 'Mulungushi University', 'Green Club', '2026-03-15', '2026-04-15', 1000, 'Completed'),
    ('Stop GBV', 'Human Rights', 'Awareness campaign against GBV', 'Copperbelt', 'Youth Alive', '2026-04-01', '2026-04-30', 2000, 'Active'),
    ('Health Outreach', 'Health', 'Free malaria testing', 'Mkushi', 'Clinic Team', '2026-05-10', '2026-05-15', 1500, 'Pending'),
    ('Food For Needy', 'Hunger', 'Food parcels for vulnerable', 'Kapiri', 'Charity Works', '2026-02-20', '2026-03-20', 4000, 'Active'),
    ('Digital Literacy', 'Education', 'Computer training for women', 'Ndola', 'ICT Club', '2026-06-01', '2026-08-01', 2500, 'Pending'),
    ('Youth Skills', 'Empowerment', 'Entrepreneurship workshop', 'Lusaka', 'ZANACO Foundation', '2026-03-01', '2026-03-05', 3500, 'Completed'),
    ('Keep Campus Clean', 'Environment', 'Monthly clean-up', 'Main Campus', 'SUC', '2026-01-15', '2026-12-15', 800, 'Active'),
    ('Blood Donation', 'Health', 'Donate blood save life', 'CBU Clinic', 'Red Cross', '2026-07-07', '2026-07-07', 0, 'Upcoming');
  `);
  console.log('Seeded 10 campaigns');
}

module.exports = db;