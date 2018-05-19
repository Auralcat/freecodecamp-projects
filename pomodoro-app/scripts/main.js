let defaultPomodoroTime = 25;
let defaultBreakTime = 5;

function showTime(visor) {
    let minutes, seconds = visor.val().split(":");
    if (seconds <= 0) {
        seconds = 59;
        minutes -= 1;
    }
    visor.val(`${minutes}:${seconds}`);
}

$(document).ready(function() {
    $("#startPomodoro").click(function() {

    });
});
