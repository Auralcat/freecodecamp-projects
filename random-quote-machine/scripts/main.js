$(document).ready(function() {
    console.log("jQuery is working");
    // Test API integration
    $.getJSON('http://quotes.rest/qod.json?category=inspire', function(data) {
        console.log("AJAX worked");
        console.log(data);
    });
    $.ajax();
});
