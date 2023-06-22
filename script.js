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

    // Render the calendar
    renderCalendar(startDate, cycleLength);
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

function renderCalendar(periodStart, cycleLength) {
  var calendarContainer = document.getElementById("calendarContainer");
  var calendar = document.createElement("table");
  calendar.classList.add("calendar");

  // Get the year and month of the period start date
  var startDate = new Date(periodStart);
  var startYear = startDate.getFullYear();
  var startMonth = startDate.getMonth();

  // Get the current date
  var currentDate = new Date();

  // Set the calendar header with month and year
  var headerRow = document.createElement("tr");
  var headerCell = document.createElement("th");
  headerCell.setAttribute("colspan", "7");
  headerCell.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(startDate);
  headerRow.appendChild(headerCell);
  calendar.appendChild(headerRow);

  // Set the calendar weekdays header
  var weekdaysRow = document.createElement("tr");
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (var i = 0; i < weekdays.length; i++) {
    var weekdaysCell = document.createElement("th");
    weekdaysCell.textContent = weekdays[i];
    weekdaysRow.appendChild(weekdaysCell);
  }
  calendar.appendChild(weekdaysRow);

  // Calculate the number of days to display in the calendar
  var numDays = 42; // Display 6 weeks

  // Calculate the first day to display in the calendar
  var firstDay = new Date(startYear, startMonth, 1);
  var firstDayIndex = firstDay.getDay(); // 0 for Sunday, 1 for Monday, ...

  // Calculate the last day to display in the calendar
  var lastDay = new Date(startYear, startMonth + 1, 0);
  var lastDayDate = lastDay.getDate();

  // Create calendar rows and cells
  var day = 1;
  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      if (i === 0 && j < firstDayIndex) {
        // Empty cells before the first day
        cell.textContent = "";
      } else if (day > lastDayDate) {
        // Empty cells after the last day
        cell.textContent = "";
      } else {
        // Day cells
        cell.textContent = day;

        // Add predicted month class if within the cycle length
        if (day <= cycleLength) {
          cell.classList.add("predicted-month");
        }

        // Highlight today's date
        if (
          currentDate.getFullYear() === startYear &&
          currentDate.getMonth() === startMonth &&
          currentDate.getDate() === day
        ) {
          cell.classList.add("today");
        }

        day++;
      }
      row.appendChild(cell);
    }
    calendar.appendChild(row);
  }

  // Remove existing calendar if present
  while (calendarContainer.firstChild) {
    calendarContainer.firstChild.remove();
  }

  // Append the calendar to the container
  calendarContainer.appendChild(calendar);
}
 
  function generateCalendarHTML(year, month, cycleLength) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
  
    let date = 1;
    let calendarHTML = `
    <div class="row">
    <div class="calendar">
      <h2>${getMonthName(month)} ${year}</h2>
      <table>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
    `;
  
    for (let i = 0; i < 6; i++) {
      calendarHTML += '<tr>';
  
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          calendarHTML += '<td></td>';
        } else if (date <= daysInMonth) {
          const dayClass = (date % cycleLength === 0) ? 'predicted-month' : '';
          calendarHTML += `<td class="${dayClass}">${date}</td>`;
          date++;
        } else {
          calendarHTML += '<td></td>';
        }
      }
  
      calendarHTML += '</tr>';
  
      if (date > daysInMonth) {
        break;
      }
    }

    calendarHTML += `
        </table>
      </div>
  `;

  const nextMonth = (month + 1) % 12;
  const nextYear = year + Math.floor((month + 1) / 12);

  const nextDaysInMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
  const nextFirstDay = new Date(nextYear, nextMonth, 1).getDay();

  let nextDate = 1;

  calendarHTML += `
    </table>
  </div>
  <div class="calendar">
    <h2>${getMonthName(nextMonth)} ${nextYear}</h2>
    <table>
      <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
  `;


const currentDate = new Date(); // Get the current date
const nextPeriodDate = calculateNextPeriod(currentDate, cycleLength); // Calculate the next period date

for (let i = 0; i < 6; i++) {
  calendarHTML += '<tr>';

  for (let j = 0; j < 7; j++) {
    if (i === 0 && j < nextFirstDay) {
      calendarHTML += '<td></td>';
    } else if (nextDate <= nextDaysInMonth) {
      let dayClass = '';
      if (nextDate <= 4 && month === currentDate.getMonth()) {
        dayClass = 'predicted-period';
      } else if (nextDate === nextPeriodDate.getDate() && nextMonth === nextPeriodDate.getMonth() && nextYear === nextPeriodDate.getFullYear()) {
        dayClass = 'next-period';
      }
      calendarHTML += `<td class="${dayClass}">${nextDate}</td>`;
      nextDate++;
    } else {
      calendarHTML += '<td></td>';
    }
  }

  calendarHTML += '</tr>';

  if (nextDate > nextDaysInMonth) {
    break;
  }
}

calendarHTML += `
      </table>
    </div>
  </div>
`;

return calendarHTML;

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



