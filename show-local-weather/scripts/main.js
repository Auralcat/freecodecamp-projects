$(document).ready(function() {
    // First you need to get the user's lat and long
    navigator.geolocation.getCurrentPosition(function(pos) {
        // Get weather through lat and long
        let latitude = Math.floor(pos.coords.latitude);
        let longitude = Math.floor(pos.coords.longitude);

        console.log(latitude);
        console.log(longitude);

        let apiEndpoint = "https://fcc-weather-api.glitch.me/api/current";
        let location = "?lat=" + latitude + "&lon=" + longitude;

        console.log(apiEndpoint + location);
        $.getJSON(apiEndpoint + location, function(data) {
            console.log(data);
        });
    });
});
