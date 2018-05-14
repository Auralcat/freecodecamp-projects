$(document).ready(function() {
    $("#searchBox").keyup(function() {
        let searchTerm = $("#searchBox").val();
        if (searchTerm != '') {

            // Break down API request
            let APILink = "https://en.wikipedia.org/w/api.php?action=opensearch";
            let searchQuery = "&search=" + searchTerm;
            let resultsLimit = "&limit=" + "3";
            let namespace = "&namespace=0";

            // Make API request
            $.ajax({
                url: APILink + searchQuery + resultsLimit + namespace + "&format=json&callback=?",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data, status, jqXHR) {
                    // Treat result
                    console.log(data);
                    let resultHTMLString = '<div class="result box-shadow">\n<h1>' + data[1][0] + '</h1>\n<p>' + data[2][0] + '</p>';
                    $(resultHTMLString).appendTo("#searchResults");
                }
            })
            .done(function() {
                console.log("complete!");
            })
            .fail(function() {
                console.log("error!");
            })
            .always(function() {
                console.log("terminated");
            });

        } else {

        }

    });
});
