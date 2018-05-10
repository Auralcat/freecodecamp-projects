$(document).ready(function() {
    $("#anotherQuote").click(function() {
        alert("You clicked the another quote button!");
        $.getJSON('http://quotes.rest/qod.json?category=inspire', function(data) {
            let quoteText = data.contents.quotes[0].quote;
            let quoteAuthor = data.contents.quotes[0].author;

            // Change jumbotron contents afterwards
        });
    });
});
