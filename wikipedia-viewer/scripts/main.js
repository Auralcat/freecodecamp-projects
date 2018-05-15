$(document).ready(function() {
    $("#searchBox").keyup(function(event) {
        let searchTerm = $("#searchBox").val();
        let pressedEnter = (event.which || event.keyCode) == 13;
        if (searchTerm != '' && pressedEnter) {

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
                    for (let i = 0; i < data.length - 1; i++) {
                        $("#searchResults").append(
                            $("<div/>").addClass("result box-shadow")
                                .append($("<a/>").addClass("article-link").attr("href", data[3][i])
                                        .append($("<h1/>").text(data[1][i]))
                                        .append($("<p/>").text(data[2][i])))
                        );
                    }
                }
            });
        }
    });
});
