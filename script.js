document.getElementById('submit-btn').addEventListener('click', function() {
    const inputDate = document.getElementById('date-input').value;
    const unixElement = document.getElementById('unix');
    const utcElement = document.getElementById('utc');
  
    let date;
  
    // If input is empty, use the current date
    if (!inputDate) {
      date = new Date();
    } else if (/^\d+$/.test(inputDate)) {
      // If the input is a Unix timestamp (only digits)
      const timestamp = inputDate.length === 13 ? parseInt(inputDate) : parseInt(inputDate) * 1000;
      date = new Date(timestamp);
    } else {
      // Else try parsing as a date string
      date = new Date(inputDate);
    }
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      unixElement.textContent = 'Invalid Date';
      utcElement.textContent = 'Invalid Date';
    } else {
      // Display the Unix timestamp and UTC date
      unixElement.textContent = date.getTime();
      utcElement.textContent = date.toUTCString();
    }
  });
  