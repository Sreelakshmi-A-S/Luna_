// script.js

function logPeriod() {
    var startDate = document.getElementById('start-date-input').value;
  
    if (startDate) {
      // Perform any necessary calculations or data processing
      var cycleLength = 28;
      var lastPeriod = startDate;
      var nextPeriod = calculateNextPeriod(startDate, cycleLength);
  
      // Update the UI with the retrieved data
      document.getElementById('cycle-length').textContent = cycleLength;
      document.getElementById('last-period').textContent = lastPeriod;
      document.getElementById('next-period').textContent = nextPeriod;
    }
  }
  
  function calculateNextPeriod(lastPeriod, cycleLength) {
    var nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    return nextPeriodDate.toISOString().split('T')[0];
  }
  