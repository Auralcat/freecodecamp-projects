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
                let $streamerPanel = $("<div />").addClass("streamer-panel");

                // Add components of div
                $streamerPanel.append($("<img />").attr("alt", "Sample image"));
                $streamerPanel.append($("<h3 />").text(streamerName));

                $("#all").append($streamerPanel);

                if (data.stream != null) {
                    console.log(`${streamerName} is streaming right now.`);
                    $("#online").append($streamerPanel);
                } else {
                    $("#offline").append($streamerPanel);
                }
            }
        });
    });
});
