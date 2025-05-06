// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Handle no date param
  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // Handle Unix timestamp (in milliseconds or seconds)
    const timestamp = dateParam.length === 13 ? parseInt(dateParam) : parseInt(dateParam) * 1000;
    date = new Date(timestamp);
  } else {
    // Try parsing as ISO string
    date = new Date(dateParam);
  }

  // Invalid date handling
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Valid response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
