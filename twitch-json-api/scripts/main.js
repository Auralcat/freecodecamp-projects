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

// Hard copy the objects!
let ajaxImgObj = JSON.parse(JSON.stringify(ajaxBaseObject));
ajaxImgObj.url = "https://wind-bow.gomix.me/twitch-api/users/"
                        + streamerObj.name;
ajaxImgObj.success = function(data, status, xhr) {
    streamerObj.profilePic = data.logo;
};

let ajaxStatusObj = JSON.parse(JSON.stringify(ajaxBaseObject));
ajaxStatusObj.url = "https://wind-bow.gomix.me/twitch-api/streams/"
                        + streamerObj.name;
ajaxStatusObj.success = function(data, status, xhr) {
    if (data.stream != null) {
        streamerObj.streamStatus = "online";
    } else {
        streamerObj.streamStatus = "offline";
    }
};

$(document).ready(function() {
    $.when($.ajax(ajaxImgObj), $.ajax(ajaxStatusObj)).done(function() {
        console.log(JSON.stringify(streamerDataList));
        streamerDataList.forEach(function(streamerObj) {
            // Generate the link
            streamerObj.profileLink = "https://twitch.tv/" + streamerObj.name;
            // Create base divs
            let $streamerPanel = $("<div />").addClass("streamer-panel");
            let $nameAndDetails = $("<div />").addClass("name-and-details");

            // Add components of div
            $streamerPanel.append($("<img />").attr("src", streamerObj.profilePic));

            $nameAndDetails.append($("<h3 />").text(streamerObj.name));
            if (streamerObj.hasOwnProperty("streamStatus")) {
                $nameAndDetails.append($("<h6 />").text(streamerObj.streamStatus));
            }
            $streamerPanel.append($nameAndDetails);

            // Add link to stream panel
            let $wrappedStreamerPanel = $("<a />").attr("href", streamerObj.profileLink)
                .addClass("channel-link");
            $wrappedStreamerPanel.append($streamerPanel);

            // Add to div according to stream status
            console.log(streamerObj);
            $("#" + streamerObj.streamStatus).append($wrappedStreamerPanel);

            // Add to all streams
            let $clone = $wrappedStreamerPanel.clone();
            $("#allStreams").append($clone);
        });
    });
});
