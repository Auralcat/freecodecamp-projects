$(document).ready(function() {
    $("#searchBox").keyup(function() {
        let searchTerm = $("#searchBox").val();
        if (searchTerm != '') {
            // It works!
            // $("#searchResults").prepend("<p>" + searchTerm + "</p>");

            // Break down API request
            let APILink = "https://en.wikipedia.org/w/api.php?action=opensearch";
            let searchQuery = "&search=" + searchTerm;
            let resultsLimit = "&limit=" + "3";
            let namespace = "&namespace=0";

            // Make API request
            $.getJSON(APILink + searchQuery + resultsLimit + namespace
                      + "&format=json", function(data) {
                $("#searchResults").html("<p>" + data + "</p>");
            });
        } else {
            $("#searchResults").html('');
        }

    });
});
