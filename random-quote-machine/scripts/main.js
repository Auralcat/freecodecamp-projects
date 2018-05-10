$(document).ready(function() {
    // Write quote
    $("#anotherQuote").click(function() {
        $.getJSON('https://got-quotes.herokuapp.com/quotes', function(data) {
            let quoteText = data.quote;
            let quoteAuthor = data.character;

            // Change jumbotron contents afterwards
            $("#quote").text(quoteText);
            $("#author").text(quoteAuthor);
        });
    });
});
