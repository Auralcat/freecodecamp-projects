const fahrenheitToCelsius = temp => (9/5) * temp + 32;
const celsiusToFahrenheit = temp => (5/9) * (temp - 32);

// Initializing some variables
let tempIsCelsius = true;

$(document).ready(function() {
    // First you need to get the user's lat and long
    navigator.geolocation.getCurrentPosition(function(pos) {
        // Get current latitude and longitude
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;

        let apiEndpoint = "https://fcc-weather-api.glitch.me/api/current";
        let location = "?lat=" + latitude + "&lon=" + longitude;

        // Get weather through lat and long
        $.getJSON(apiEndpoint + location, function(data) {
            console.log(data);
            console.log(data.weather[0].icon);

            $("#cityName").text(data.name);

            $("#weather-icon-panel").prepend('<img class="weather-icon" src=' + data.weather[0].icon + '" />');
            $("#mainCondition").text(data.weather[0].main);
            $("#description").text(data.weather[0].description);

            $("#currentTemperature").text(data.main.temp);
            $("#minimumTemperature").text(data.main.temp_min);
            $("#maximumTemperature").text(data.main.temp_max);

            $("#windSpeed").text("Wind speed: " + data.wind.speed);
            $(".wind-arrow").css("transform", "rotate(" + data.wind.deg + "deg)");
        });

        $("#toggleFahCel").click(function() {
            let currTemp = $("#currentTemperature").text();
            let minTemp = $("#minimumTemperature").text();
            let maxTemp = $("#maximumTemperature").text();

            if (tempIsCelsius) {
                $("#currentTemperature").text(celsiusToFahrenheit(currTemp).toPrecision(4));
                $("#minimumTemperature").text(celsiusToFahrenheit(minTemp).toPrecision(4));
                $("#maximumTemperature").text(celsiusToFahrenheit(maxTemp).toPrecision(4));
                $(".temperature-unit").attr("src", "assets/img/weather-icons/Degrees-Fahrenheit.svg");
                tempIsCelsius = false;
            } else {
                $("#currentTemperature").text(fahrenheitToCelsius(currTemp).toPrecision(4));
                $("#minimumTemperature").text(fahrenheitToCelsius(minTemp).toPrecision(4));
                $("#maximumTemperature").text(fahrenheitToCelsius(maxTemp).toPrecision(4));
                $(".temperature-unit").attr("src", "assets/img/weather-icons/Degrees-Celcius.svg");
                tempIsCelsius = true;
            }
        });
    });
});
