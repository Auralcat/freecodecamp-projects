$(document).ready(function() {
    console.log("jQuery is working");
    // Test API integration
    $.getJSON('http://quotes.rest/qod.json?category=inspire', function(data) {
        let quoteText = data.contents.quotes[0].quote;
        let quoteAuthor = data.contents.quotes[0].author;

        // Change jumbotron contents afterwards
    });
    $.ajax();
});
