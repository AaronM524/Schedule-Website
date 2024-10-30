$(document).ready(function () {
  const btn = $("#submitDay");

  const bellSchedule = {
      1: { start: '8:24 AM', end: '9:31 AM' },
      2: { start: '9:36 AM', end: '10:43 AM' },
      3: { start: '10:48 AM', end: '11:55 AM' },
      lunch: { start: '11:55 AM', end: '12:36 PM' }, // Lunch period
      4: { start: '12:41 PM', end: '1:48 PM' },
      5: { start: '1:53 PM', end: '3:00 PM' }
  };

  btn.on('click', function () {
      const selectedDay = $("#dayInput").val().toUpperCase();

      $.ajax({
          url: `https://api.npoint.io/8f7b9e912896b167d39b`,
          method: 'GET',
          success: function (data) {
              const schedule = data.schedule.filter(item => item.days.includes(selectedDay));
              
              if (schedule.length === 0) {
                  alert("No classes scheduled for this day.");
              } else {
                  $("#scheduleList").empty(); // Clear previous data

                  schedule.forEach(item => {
                      const periodTime = bellSchedule[item.period] || { start: "N/A", end: "N/A" };
                      const row = `
                          <tr>
                              <td>${item.period}</td>
                              <td>${periodTime.start} - ${periodTime.end}</td>
                              <td>${item.class}</td>
                              <td>${item.teacher}</td>
                              <td>${item.room}</td>
                          </tr>
                      `;
                      $("#scheduleList").append(row);

                      // Insert lunch row after period 3
                      if (item.period === 3) {
                          const lunchRow = `
                              <tr>
                                  <td>Lunch</td>
                                  <td>${bellSchedule.lunch.start} - ${bellSchedule.lunch.end}</td>
                                  <td colspan="3">Lunch Break</td>
                              </tr>
                          `;
                          $("#scheduleList").append(lunchRow);
                      }
                  });
              }
          },
          error: function () {
              alert("There's a connection error.");
          }
      });
  });
});
