$(document).ready(function() {
    // Write quote
    $("#anotherQuote").click(function() {
        $.getJSON("https://got-quotes.herokuapp.com/quotes", function(data) {
            // Clear the contents
            $("#quote").text("");
            $("#author").text("");

            let quoteText = data.quote;
            let quoteAuthor = data.character;

            // Get the wait time by dividing the quote's length by the typing
            // speed * 0.3
            let waitTime = Math.ceil(quoteText.length/0.024) + 300;
            console.log(`${quoteText.length} / 0.015 = ${waitTime}`);


            // Type the content!
            let typedQuote = new Typed("#quote", {
                strings: [quoteText],
                typeSpeed: 30
            });

            // Wait for the quote to finish, then write author's name
            setTimeout(function() {
                let typedAuthor = new Typed("#author", {
                    strings: [quoteAuthor],
                    typeSpeed: 30
                });
                // Remove typed cursor
                $(".typed-cursor").hide();
            }, waitTime);
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
