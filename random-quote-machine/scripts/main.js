$(document).ready(function() {
    // Write quote
    $("#anotherQuote").click(function() {
        $.getJSON("https://got-quotes.herokuapp.com/quotes", function(data) {
            // Clear the contents
            $("#quote").text("");
            $("#author").text("");

            let quoteText = data.quote;
            let quoteAuthor = data.character;

            // Type the content!
            let typedQuote = new Typed("#quote", {
                strings: [quoteText],
                typeSpeed: 30
            });

            setTimeout(function() {
                let typedAuthor = new Typed("#author", {
                    strings: [quoteAuthor],
                    typeSpeed: 30
                });
            }, 5000);

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
