let defaultPomodoroTime = 25 * 60 * 1000;
let defaultShortBreakTime = 5 * 60 * 1000;
let defaultLongBreakTime = 15 * 60 * 1000;

function countBreakTime(breakTimer, currentInterval) {
    // Call this inside the main count function
    $("#visor").text(showTime(breakTimer));
    currentInterval = setInterval(function() {
        breakTimer -= 1000;
        $("#visor").text(showTime(breakTimer));
        if (breakTimer <= 0) {
            // Reset everything
            clearInterval(currentInterval);
            breakTimer = defaultLongBreakTime * 60 * 1000;
            $("#visor").text(showTime(mainTimer));
        }
    }, 1000);
}

function showTime(rawTime) {
    // Receives raw time and returns the formatted string
    let minutes = Math.floor(rawTime / 60000);
    let seconds = Math.floor(rawTime % 60000) / 1000;
    let out = [];
    if (minutes < 10) {
        out.push("0" + minutes);
    } else {
        out.push(minutes);
    }
    if (seconds < 10) {
        out.push("0" + seconds);
    } else {
        out.push(seconds);
    }
    return out.join(":");
}

$(document).ready(function() {
    let initialTimer = defaultPomodoroTime;
    let initialShortBreakTime = defaultShortBreakTime;
    let initialLongBreakTime = defaultLongBreakTime;
    let currentInterval;
    let completedPomodoros = 0;

    $("#visor").text(showTime(defaultPomodoroTime));
    $("#completedPomodoros").text("Completed pomodoros: " + completedPomodoros);

    $("#startPomodoro").click(function() {
        $("#visor").text(showTime(initialTimer));
        let timer = initialTimer;

        currentInterval = setInterval(function() {
            // Reduce the time for each tick
            timer -= 1000;
            $("#visor").text(showTime(timer));
            // Finish counting when timer hits 0.
            if (timer <= 0) {
                clearInterval(currentInterval);
                $("#visorHeader").text("Break time!");

                // If 3 pomodoros have been completed, do a long break
                if (completedPomodoros === 3) {
                    countBreakTime(initialTimer, initialLongBreakTime, currentInterval);
                    completedPomodoros = 0;
                } else {
                    countBreakTime(initialTimer, initialShortBreakTime, currentInterval);
                    completedPomodoros += 1;
                }
                $("#completedPomodoros").text("Completed pomodoros: " + completedPomodoros);
            }
        }, 1000);
    });

    $("#stopPomodoro").click(function() {
        clearInterval(currentInterval);
    });

    $("#resetPomodoro").click(function() {
        $("#visor").text(showTime(initialTimer));
    });

    $("#customizePomodoroLength").click(function() {
        let inputLength = prompt("Type the desired pomodoro duration in minutes:");
        initialTimer = inputLength * 60 * 1000;
        $("#visor").text(showTime(initialTimer));
    });

    $("#customizeShortBreak").click(function() {
        let inputShortBreak = prompt("Type the desired short break duration in minutes:");
        initialShortBreakTime = inputShortBreak * 60 * 1000;
    });

    $("#customizeLongBreak").click(function() {
        let inputLongBreak = prompt("Type the desired long break duration in minutes:");
        initialLongBreakTime = inputLongBreak * 60 * 1000;
    });
});
