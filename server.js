// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Route to handle the date conversion
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  let date;

  // If no date is provided, return the current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if the provided date is a Unix timestamp
    if (isNaN(dateString)) {
      date = new Date(dateString);
    } else {
      // If it's a Unix timestamp, convert it to milliseconds
      date = new Date(parseInt(dateString));
    }
  }

  // If the date is invalid, return an error message
  if (date == 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Return the result with Unix and UTC formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
