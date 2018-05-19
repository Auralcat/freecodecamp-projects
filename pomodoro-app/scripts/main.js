let defaultPomodoroTime = 25;
let defaultShortBreakTime = 5;
let defaultLongBreakTime = 15;

// Leave it like this for now
function countTime(timer, callback) {
    setInterval(function() {
        // Reduce the time for each tick
        timer -= 1000;
        $("#visor").text(showTime(timer));
        // Finish counting when timer hits 0.
        if (timer <= 0) {
            callback();
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

    $("#visor").text(showTime(timer));

    $("#startPomodoro").click(function() {
        currentInterval = setInterval(function() {
            // Reduce the time for each tick
            timer -= 1000;
            $("#visor").text(showTime(timer));
            // Finish counting when timer hits 0.
            if (timer <= 0) {
                clearInterval(currentInterval);
                $("#visorHeader").text("Break time!");
                $("#visor").text(showTime(shortBreakTime));
                currentInterval = setInterval(function() {
                    shortBreakTime -= 1000;
                    $("#visor").text(showTime(shortBreakTime));
                    if (shortBreakTime <= 0) {
                        clearInterval(currentInterval);
                        // Reset everything
                        timer = defaultPomodoroTime * 60 * 1000;
                        shortBreakTime = defaultPomodoroTime * 60 * 1000;
                        $("#visor").text(showTime(timer));
                    }
                }, 1000);
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
