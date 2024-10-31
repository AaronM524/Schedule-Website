$(document).ready(function () {
    const btn = $("#submitDay");

    const dailyPeriods = {
        A: [1, 2, 3, "Lunch", 5, 6],
        B: [4, 1, 2, "Lunch", 7, 5],
        C: [3, 4, 1, "Lunch", 6, 7],
        D: [2, 3, 4, "Lunch", 5, 6],
        E: [1, 2, 3, "Lunch", 7, 5],
        F: [4, 1, 2, "Lunch", 6, 7],
        G: [3, 4, 7, "Lunch", 5, 6]
    };

    btn.on('click', function () {
        const selectedDay = $("#dayInput").val().toUpperCase();
        
        $.ajax({
            url: 'https://api.npoint.io/8f7b9e912896b167d39b',
            method: 'GET',
            success: function (data) {
                const schedule = data.schedule;
                const dayPeriods = dailyPeriods[selectedDay];
                $("#scheduleList").empty(); 


                dayPeriods.forEach(period => {
                    if (period === "Lunch") {
                        const lunchRow = `
                            <tr>
                                <td>Lunch</td>
                                <td colspan="3">Lunch Break</td>
                            </tr>
                        `;
                        $("#scheduleList").append(lunchRow);
                    } else {
                        const classItem = schedule.find(item => item.period === period && item.days.includes(selectedDay));
                        
                        if (classItem) {
                            const row = `
                                <tr>
                                    <td>${classItem.period}</td>
                                    <td>${classItem.class}</td>
                                    <td>${classItem.teacher}</td>
                                    <td>${classItem.room}</td>
                                </tr>
                            `;
                            $("#scheduleList").append(row);
                    }
                }
                });
            },
            error: function () {
                alert("There's a connection error.");
            }
        });
    });
});
