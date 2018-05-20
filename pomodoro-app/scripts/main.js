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

function showCompletedPomodoros(completedPomodoros) {
    // Adds a small tomato icon to a div
    let imgLink = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/"
            + "Emojione_1F345.svg/120px-Emojione_1F345.svg.png";
    // Clear old data first
    $("#completedPomodoros").remove();
    let $completedPomodoros = $("<div/>").attr("id", "completedPomodoros");
    for (let i = 0; i < completedPomodoros; i++) {
        $completedPomodoros.append(
            $("<img />").attr("src", imgLink)
                .addClass("completed-pomodoro-img")
        );
    }
    $(".completed-pomodoros-panel").append($completedPomodoros);
};

$(document).ready(function() {
    let initialTimer = defaultPomodoroTime;
    let initialShortBreakTime = defaultShortBreakTime;
    let initialLongBreakTime = defaultLongBreakTime;
    let currentInterval;
    let completedPomodoros = 8;

    $("#visor").text(showTime(defaultPomodoroTime));
    showCompletedPomodoros(completedPomodoros);

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
                showCompletedPomodoros(completedPomodoros);
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
