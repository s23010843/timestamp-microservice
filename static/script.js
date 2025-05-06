function getTimestamp() {
  const dateInput = document.getElementById('dateInput').value.trim();
  const url = dateInput ? `/api/timestamp/${dateInput}` : '/api/timestamp/';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      const unixSpan = document.getElementById('unix');
      const utcSpan = document.getElementById('utc');

      if (data.error) {
        unixSpan.textContent = 'Invalid Date';
        utcSpan.textContent = '';
      } else {
        unixSpan.textContent = data.unix;
        utcSpan.textContent = data.utc;
      }

      resultDiv.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
