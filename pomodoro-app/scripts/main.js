let defaultPomodoroTime = 25;
let defaultShortBreakTime = 5;
let defaultLongBreakTime = 15;

function countTime(timer, callback) {
    setInterval(function() {
        // reduce the time for each tick
        timer -= 1000;
        $("#visor").text(showTime(timer));
        // finish counting when timer hits 0.
        if (timer <= 0) {
            callback();
        }
    }, 1000);
}

function countBreakTime(mainTimer, breakTimer, currentInterval) {
    // Call this inside the main count function
    $("#visor").text(showTime(breakTimer));
    currentInterval = setInterval(function() {
        console.log("Ticking");
        breakTimer -= 1000;
        $("#visor").text(showTime(breakTimer));
        if (breakTimer <= 0) {
            // Reset everything
            clearInterval(currentInterval);
            mainTimer = defaultPomodoroTime * 60 * 1000;
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
    let timer = defaultPomodoroTime * 60 * 1000;
    let shortBreakTime = defaultShortBreakTime * 60 * 1000;
    let longBreakTime = defaultLongBreakTime * 60 * 1000;
    let currentInterval;
    let completedPomodoros = 0;

    $("#visor").text(showTime(timer));
    $("#completedPomodoros").text("Completed pomodoros: " + completedPomodoros);

    $("#startPomodoro").click(function() {
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
                    countBreakTime(timer, longBreakTime, currentInterval);
                    completedPomodoros = 0;
                } else {
                    countBreakTime(timer, shortBreakTime, currentInterval);
                }
                $("#completedPomodoros").text("Completed pomodoros: " + completedPomodoros);
            }
        }, 1000);
    });

    $("#stopPomodoro").click(function() {
        clearInterval(currentInterval);
    });

    $("#resetPomodoro").click(function() {
        timer = defaultPomodoroTime * 60 * 1000;
        $("#visor").text(showTime(timer));
    });

    $("#customizePomodoroLength").click(function() {
        let inputLength = prompt("Type the desired pomodoro duration in minutes:");
        timer = inputLength * 60 * 1000;
        $("#visor").text(showTime(timer));
    });

    $("#customizeShortBreak").click(function() {
        let inputShortBreak = prompt("Type the desired short break duration in minutes:");
        shortBreakTime = inputShortBreak * 60 * 1000;
    });

    $("#customizeLongBreak").click(function() {
        let inputLongBreak = prompt("Type the desired long break duration in minutes:");
        longBreakTime = inputLongBreak * 60 * 1000;
    });
});
