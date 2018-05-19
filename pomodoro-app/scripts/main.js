let defaultPomodoroTime = 25;
let defaultBreakTime = 5;

function showTime(rawTime) {
    // Receives raw time and returns the formatted string
    let minutes = Math.floor(rawTime / 60000);
    let seconds = Math.floor(rawTime % 60000) / 1000;
    return `${minutes}:${seconds}`;
}

$(document).ready(function() {
    $("#startPomodoro").click(function() {
        let timer = defaultPomodoroTime * 60 * 1000;

        setInterval(function() {
            // Reduce the time for each tick
            timer -= 1000;
            $("#visor").text(showTime(timer));
            // Finish counting when timer hits 0.
            if (timer === 0) {
                clearInterval();
            }
        }, 1000);
    });
});
