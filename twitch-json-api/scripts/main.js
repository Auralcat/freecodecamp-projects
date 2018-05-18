let streamerDataList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
    "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
].map(function(streamerName) {
    return {
        name: streamerName
    };
});

// Create a base Ajax request object to keep it DRY
let ajaxBaseObject = {
    type: "GET",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    // Use JSONP - JSON with padding - for cross origin requests.
    // I'm not sure about how safe it is, but it works. :P
    dataType: "jsonp"
};

function getImageLinks(ajaxBaseObject) {
    // Add the image link to each object.
    streamerDataList.forEach(function(streamerObj) {
        ajaxBaseObject.url = "https://wind-bow.gomix.me/twitch-api/users/"
                             + streamerObj.name;
        ajaxBaseObject.success = function(data, status, xhr) {
            streamerObj.profilePic = data.logo;
        };
        $.ajax(ajaxBaseObject);
    });
}

$(document).ready(function() {
    $.when(getImageLinks(ajaxBaseObject)).done(function() {

        streamerDataList.forEach(function(streamerObj) {
            ajaxBaseObject.url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamerObj.name;
            ajaxBaseObject.success = function(data, status, xhr) {
                let $streamerPanel = $("<div />").addClass("streamer-panel");
                streamerObj.profileLink = "https://twitch.tv/" + streamerObj.name;
                let $nameAndDetails = $("<div />").addClass("name-and-details");

                // Add components of div
                $streamerPanel.append($("<img />").attr("src", streamerObj.profilePic));

                $nameAndDetails.append($("<h3 />").text(streamerObj.name));
                $streamerPanel.append($nameAndDetails);

                // Add link to stream panel
                let $wrappedStreamerPanel = $("<a />").attr("href", streamerObj.profileLink)
                    .addClass("channel-link");
                $wrappedStreamerPanel.append($streamerPanel);

                if (data.stream != null) {
                    console.log(`${streamerObj.name} is streaming right now.`);
                    $nameAndDetails.append($("<h6/>").text(data.stream.channel.status));
                    $streamerPanel.append($("<img />")
                        .addClass("status-icon")
                        .attr("src", "assets/img/check.svg"));
                    $("#online").append($wrappedStreamerPanel);
                } else {
                    $("#offline").append($wrappedStreamerPanel);
                }

                // Add to all streams
                let $clone = $wrappedStreamerPanel.clone();
                $("#allStreams").append($clone);
            };

            // Request stream status
            $.ajax(ajaxBaseObject);
        });
    });
});
