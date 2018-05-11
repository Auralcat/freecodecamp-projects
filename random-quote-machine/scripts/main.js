$(document).ready(function() {
    // Write quote
    $("#anotherQuote").click(function() {
        $.getJSON("https://got-quotes.herokuapp.com/quotes", function(data) {
            let quoteText = data.quote;
            let quoteAuthor = data.character;

            $(".quote-box").removeClass("quote-active");
            // Animate quote
            setTimeout(function() {$(".quote-box").addClass("quote-active");},
                       20);

            // Change jumbotron contents afterwards
            $("#quote").text(quoteText);
            $("#author").text(quoteAuthor);
        });
    });

    // Tweet quote
    $("#tweetQuote").click(function() {
        let targetText = $("#quote").text();
        let targetAuthor = $("#author").text();

        let twitterLink = "https://twitter.com/intent/tweet?text=";
        window.open(twitterLink + targetText + " - " + targetAuthor
                    + " via @miriamretka's Random Quote Machine",
                    "width=500,height=300");
    });
});
