const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Init DB
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS quiz_results (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      time_seconds INTEGER NOT NULL,
      completed_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log('✅ DB ready');
}

// Submit result
app.post('/api/submit', async (req, res) => {
  const { name, score, total, time_seconds } = req.body;
  if (!name || score === undefined || !total || !time_seconds) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    await pool.query(
      'INSERT INTO quiz_results (name, score, total, time_seconds) VALUES ($1, $2, $3, $4)',
      [name.trim(), score, total, time_seconds]
    );
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'DB error' });
  }
});

// Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT name, score, total, time_seconds, completed_at
      FROM quiz_results
      ORDER BY score DESC, time_seconds ASC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: 'DB error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await initDB();
  console.log(`🌊 Ocean Quiz running on port ${PORT}`);
});
