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

function hasStreamerPic(link, streamerName) {
    let hasCustomPic = link.indexOf(streamerName.toLowerCase()) !== -1;
    let hasDefaultPic = link.indexOf("user-default-pictures") !== -1;

    console.log("Checking " + link + " for " + streamerName);
    if (hasCustomPic) {
        console.log("Pic for " + streamerName + " is " + link);
    }
    return hasCustomPic || hasDefaultPic;
}

$(document).ready(function() {
    $.when(getImageLinks(ajaxBaseObject)).done(function() {
        console.log(imageLinkArr);

        streamerDataList.forEach(function(streamerName) {
            ajaxBaseObject.url = "https://wind-bow.gomix.me/twitch-api/streams/" + streamerName;
            ajaxBaseObject.success = function(data, status, xhr) {
                let $streamerPanel = $("<div />").addClass("streamer-panel");
                let streamerLink = "https://twitch.tv/" + streamerName;
                let $nameAndDetails = $("<div />").addClass("name-and-details");

                // Add components of div
                let imageLink = imageLinkArr.find(link => hasStreamerPic(link, streamerName));
                $streamerPanel.append($("<img />").attr("src", imageLink));

                $nameAndDetails.append($("<h3 />").text(streamerName));
                $streamerPanel.append($nameAndDetails);

                // Add link to stream panel
                let $wrappedStreamerPanel = $("<a />").attr("href", streamerLink)
                    .addClass("channel-link");
                $wrappedStreamerPanel.append($streamerPanel);

                if (data.stream != null) {
                    console.log(`${streamerName} is streaming right now.`);
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
