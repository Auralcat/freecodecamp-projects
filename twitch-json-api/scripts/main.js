let streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function() {
    streamerList.forEach(function(streamerName) {
        $.ajax({
            type: "GET",
            url: "https://wind-bow.gomix.me/twitch-api/streams/" + streamerName,
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            // Use JSONP - JSON with padding - for cross origin requests.
            // I'm not sure about how safe it is, but it works. :P
            dataType: "jsonp",
            success: function(data, status, xhr) {
                let $streamerPanel = $("<div />").addClass("streamer-panel");
                let streamerLink = "https://twitch.tv/" + streamerName;

                // Add components of div
                $streamerPanel.append($("<img />").attr("alt", "Sample image"));
                $streamerPanel.append($("<h3 />").text(streamerName));

                // Add link to stream panel
                let $wrappedStreamerPanel = $("<a />").attr("href", streamerLink)
                                            .addClass("channel-link");
                $wrappedStreamerPanel.append($streamerPanel);
                let $clone = $wrappedStreamerPanel.clone();
                $("#allStreams").append($clone);

                if (data.stream != null) {
                    console.log(`${streamerName} is streaming right now.`);
                    $streamerPanel.append($("<h5/>").text(data.stream.channel.status));
                    $("#online").append($wrappedStreamerPanel);
                } else {
                    $("#offline").append($wrappedStreamerPanel);
                }
            }
        });
    });
});
