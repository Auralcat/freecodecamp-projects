$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://wind-bow.gomix.me/twitch-api/streams",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
        }
    });
});
