let streamerDataList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                        "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"
].map(function(streamerName) {
    return {
        name: streamerName,
        profileLink: "https://twitch.tv/" + streamerName
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

function updateTab(streamerObj) {
    // Adds streamer to its respective tab.
    // Create base divs
    let $streamerPanel = $("<div />").addClass("streamer-panel");
    let $nameAndDetails = $("<div />").addClass("name-and-details");
    let $picContainer = $("<div />").addClass(".pic-container");

    // Add components of div
    $picContainer.append($("<img />")
                          .addClass("profile-pic")
                          .attr("src", streamerObj.profilePic));
    $nameAndDetails.append($("<h3 />").text(streamerObj.name));

    $streamerPanel.append($picContainer);
    $streamerPanel.append($nameAndDetails);
    if (streamerObj.hasOwnProperty("streamDetails")) {
        $nameAndDetails.append($("<h6 />").text(streamerObj.streamDetails));
        // Add check mark
        $streamerPanel.append($("<img />").attr("src", "assets/img/check.svg"));
    }

    // Add link to stream panel
    let $wrappedStreamerPanel = $("<a />").attr("href", streamerObj.profileLink)
        .addClass("channel-link");
    $wrappedStreamerPanel.append($streamerPanel);

    // Add to div according to stream status
    $("#" + streamerObj.streamStatus).append($wrappedStreamerPanel);

    // Add to all streams
    let $clone = $wrappedStreamerPanel.clone();
    $("#allStreams").append($clone);
}

$(document).ready(function() {
    // First, request the stream status
    streamerDataList.forEach(function(streamerObj) {

        let ajaxStatusObj = JSON.parse(JSON.stringify(ajaxBaseObject));
        ajaxStatusObj.url = "https://wind-bow.gomix.me/twitch-api/streams/" +
            streamerObj.name;
        ajaxStatusObj.success = function(data, status, xhr) {
            if (data.stream != null) {
                streamerObj.streamStatus = "online";
                // Get details from here
                streamerObj.streamDetails = data.stream.channel.status;
                // Get pic from here
                streamerObj.profilePic = data.stream.channel.logo;
                updateTab(streamerObj);
            } else {
                // If there's no stream, get pic from another request
                streamerObj.streamStatus = "offline";

                let ajaxImgObj = JSON.parse(JSON.stringify(ajaxBaseObject));
                ajaxImgObj.url = "https://wind-bow.gomix.me/twitch-api/users/" +
                    streamerObj.name;
                ajaxImgObj.success = function(data, status, xhr) {
                    streamerObj.profilePic = data.logo;
                    updateTab(streamerObj);
                };
                $.ajax(ajaxImgObj);
            }
        };
        $.ajax(ajaxStatusObj);
    });
});
