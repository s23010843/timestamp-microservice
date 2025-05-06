// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Timestamp API route
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  // If no date is provided, use the current date
  if (!dateParam) {
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // If the date is a Unix timestamp, convert it to a Date object
    const timestamp = dateParam.length === 13 ? parseInt(dateParam) : parseInt(dateParam) * 1000;
    date = new Date(timestamp);
  } else {
    // Try parsing the provided date string
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  // Return Unix and UTC formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Server startup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
