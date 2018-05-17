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
                let streamStatus = "Not streaming";
                if (data.stream != null) {
                    console.log(`${streamerName} is streaming right now.`);
                    streamStatus = "Streaming!";
                }
                $("#streamerTable").append(
                    $("<tr />").append($("<td />").text(streamerName))
                        .append($("<td />").text(streamStatus)));
            }
        });
    });
});
