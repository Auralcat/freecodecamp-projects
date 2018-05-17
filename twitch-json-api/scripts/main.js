let streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function() {
    streamerList.forEach(function(streamerName) {
        $.ajax({
            type: "GET",
            url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamerName,
            async: true,
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            // Use JSONP - JSON with padding - for cross origin requests.
            // I'm not sure about how safe it is, but it works. :P
            dataType: "jsonp",
            success: function(data, status, xhr) {
                $("#streamerTable").append(
                    $("<tr />").append($("<td />").text(streamerName)));
                if (Object.keys(data.stream).length != 0) {
                    console.log(`${streamerName} is streaming right now.`);
                }
            }
        });
    });
});
