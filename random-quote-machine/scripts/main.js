$(document).ready(function() {
    console.log("jQuery is working");
    // Test API integration
    $.getJSON('https://andruxnet-random-famous-quotes.p.mashape.com/', function(data) {
        console.log("AJAX worked");
        console.log(data);
    });
});
