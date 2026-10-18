require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// GET ALL
app.get('/api/campaigns', (req, res) => {
  const rows = db.prepare('SELECT * FROM campaigns').all();
  res.json(rows);
});

// GET ONE
app.get('/api/campaigns/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM campaigns WHERE id=?').get(req.params.id);
  if(!row) return res.status(404).json({error:'Not found'});
  res.json(row);
});

// CREATE
app.post('/api/campaigns', (req, res) => {
  const { campaign_name, cause, description, location, organizer, start_date, target_amount, status } = req.body;
  if(!campaign_name) return res.status(400).json({error:'campaign_name required'});
  const result = db.prepare(`INSERT INTO campaigns 
  (campaign_name, cause, description, location, organizer, start_date, target_amount, status) 
  VALUES (?,?,?,?,?,?,?,?)`).run(campaign_name, cause, description, location, organizer, start_date, target_amount||0, status||'Active');
  res.json({id: result.lastInsertRowid});
});

// UPDATE
app.put('/api/campaigns/:id', (req, res) => {
  const { campaign_name, cause, description, location, organizer, start_date, target_amount, status } = req.body;
  db.prepare(`UPDATE campaigns SET campaign_name=?, cause=?, description=?, location=?, organizer=?, start_date=?, target_amount=?, status=? WHERE id=?`)
  .run(campaign_name, cause, description, location, organizer, start_date, target_amount, status, req.params.id);
  res.json({ok:true});
});

// DELETE
app.delete('/api/campaigns/:id', (req, res) => {
  db.prepare('DELETE FROM campaigns WHERE id=?').run(req.params.id);
  res.json({ok:true});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});