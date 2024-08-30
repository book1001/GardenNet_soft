document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'AIzaSyA5qWllBxBtVC-9l3Ck5nt_9bMbtWapEBc';
  const calendarId = '0a38a25654c0430d63d7d15025f8d79fc2dace32374c4fd54464d4956cfc4246@group.calendar.google.com';

  const calendarEl = document.getElementById('schedule-p3');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridFourWeek',
    timeZone: 'America/New_York',
    initialDate: '2024-09-10',
    firstDay: 1,
    views: {
      dayGridFourWeek: {
        type: 'dayGrid',
        duration: { weeks: 5 },
      },
    },
    headerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    eventContent: function (args) {
    const { event } = args;
      
    const timeFormat = new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: '2-digit',
      weekday: 'long',
      hour12: true,
    });
    const timeText = timeFormat.format(event.start);

    return {
      html: `
        <div class="fc-event-url">${event.url}</div>
      `
    };
  },
    events: function (info, successCallback, failureCallback) {
      fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeZone=${encodeURIComponent(info.timeZone)}`)
        .then(response => response.json())
        .then(data => {
          const events = data.items.map(eventData => ({
            id: eventData.id,
            title: eventData.summary,
            start: eventData.start.dateTime || eventData.start.date,
            end: eventData.end.dateTime || eventData.end.date,
            allDay: eventData.start.date !== undefined,
            url: eventData.description
          }));
          successCallback(events);
        })
        .catch(error => {
          console.error('Error fetching calendar events:', error);
          failureCallback(error);
        });
    }
  });

  calendar.render();
});


document.addEventListener('DOMContentLoaded', function () {
  // 달력이 렌더링된 후에 실행하기 위해 setTimeout 사용 (달력의 렌더링이 비동기적으로 이루어질 수 있음)
  setTimeout(function() {
    const elements = document.querySelectorAll('.fc-daygrid-month-start');
    elements.forEach(function(element) {
      if (element.textContent.includes('September')) {
        element.textContent = element.textContent.replace('September', '9/');
      } 
      else if (element.textContent.includes('October')) {
        element.textContent = element.textContent.replace('October', '10/');
      } 
      else if (element.textContent.includes('November')) {
        element.textContent = element.textContent.replace('November', '11/');
      } 
      else if (element.textContent.includes('December')) {
        element.textContent = element.textContent.replace('December', '12/');
      }
    });
    
    const elements2 = document.querySelectorAll('.fc-daygrid-day-number.fc-daygrid-month-start');
    elements2.forEach(function(element2) {
      // 공백 문자가 있는지 확인
      if (/\s/.test(element2.textContent)) {
        // 공백 문자를 모두 제거
        element2.textContent = element2.textContent.replace(/\s+/g, '');
      }
    });
    
  }, 100);
});
