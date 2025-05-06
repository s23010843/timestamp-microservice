const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for FreeCodeCamp testing
app.use(cors());

// Root route (optional, just for info)
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  let parsedDate;

  if (!date) {
    // No date provided, use current time
    parsedDate = new Date();
  } else {
    // Check if it's a Unix timestamp (pure number)
    if (/^\d+$/.test(date)) {
      parsedDate = new Date(parseInt(date));
    } else {
      parsedDate = new Date(date);
    }
  }

  // Handle invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Send response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Timestamp Microservice running on port ${port}`);
});
