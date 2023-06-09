// script.js

function logPeriod() {
    var startDate = document.getElementById('start-date-input').value;
    var cycleLength = parseInt(document.getElementById('cycle-length-input').value);
  
    if (startDate && cycleLength) {
      var lastPeriod = new Date(startDate);
      var nextPeriod = calculateNextPeriod(lastPeriod, cycleLength);
  
      // Format the dates in "dd-mm" format
      lastPeriod = formatDate(lastPeriod);
      nextPeriod = formatDate(nextPeriod);
  
      // Update the UI with the retrieved data
      document.getElementById('cycle-length').textContent = cycleLength;
      document.getElementById('last-period').textContent = lastPeriod;
      document.getElementById('next-period').textContent = nextPeriod;
    }
  }
  
  function calculateNextPeriod(lastPeriod, cycleLength) {
    var nextPeriodDate = new Date(lastPeriod);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);
    nextPeriodDate.setHours(0, 0, 0, 0);
    return nextPeriodDate;
  }
  
  function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
  
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
  
    return day + '-' + month + '-' + year;
  }


function goToNextPage() {
  window.location.href = "second_page.html";
}

function goBack() {
  window.location.href = "third_page.html";
}

function goBack2() {
  window.location.href = "next.html";
}

function goBack3() {
  window.location.href = "index.html";
}

