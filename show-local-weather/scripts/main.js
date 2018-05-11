$(document).ready(function() {
    // First you need to get the user's lat and long
    navigator.geolocation.getCurrentPosition(function(pos) {
        // Get current latitude and longitude
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;

        console.log(latitude);
        console.log(longitude);

        let apiEndpoint = "https://fcc-weather-api.glitch.me/api/current";
        let location = "?lat=" + latitude + "&lon=" + longitude;

        console.log(apiEndpoint + location);

        // Get weather through lat and long
        $.getJSON(apiEndpoint + location, function(data) {
            console.log(data);
            console.log(data.weather[0].icon);

            $("#currentTemperature").text("Current temperature: " + data.main.temp);
            $("#minTemperature").text("Mininum temperature: " + data.main.temp_min);
            $("#maxTemperature").text("Maximum temperature: " + data.main.temp_max);
        });
    });
});
