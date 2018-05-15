$(document).ready(function() {
    $("#searchBox").keyup(function() {
        let searchTerm = $("#searchBox").val();
        if (searchTerm != '') {

            // Break down API request
            let APILink = "https://en.wikipedia.org/w/api.php?action=opensearch";
            let searchQuery = "&search=" + searchTerm;
            let resultsLimit = "&limit=" + "3";
            let namespace = "&namespace=0";

            // Clean old results
            $("#searchResults").empty();

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
                    // Show all results in their divs
                    for (let i = 0; i < data.length; i++) {
                        let resultHTMLString = '<a href="' + data[3][i] + '">"<div class="result box-shadow">\n<h1>' + data[1][i] + '</h1>\n<p>' + data[2][i] + '</p>\n'
                                            + '"<div></a>';
                        $(resultHTMLString).appendTo("#searchResults");
                    }
                }
            });
        }
    });
});