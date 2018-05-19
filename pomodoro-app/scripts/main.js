let defaultPomodoroTime = 25;
let defaultBreakTime = 5;

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
    let countTime;
    let timer;

    $("#startPomodoro").click(function() {
        timer = defaultPomodoroTime * 60 * 1000;
        $("#visor").text(showTime(timer));

        countTime = setInterval(function() {
            // Reduce the time for each tick
            timer -= 1000;
            $("#visor").text(showTime(timer));
            // Finish counting when timer hits 0.
            if (timer === 0) {
                clearInterval(this);
            }
        }, 1000);
    });

    $("#stopPomodoro").click(function() {
        clearInterval(countTime);
    });

    $("#resetPomodoro").click(function() {
        timer = defaultPomodoroTime * 60 * 1000;
        $("#visor").text(showTime(timer));
    });
});
