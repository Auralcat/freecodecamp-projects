// Implementing the search function.
$(document).ready(function() {
    $("#searchBox").keyup(function(e) {
        // First, clear the results div and hide all tabs
        e.preventDefault();
        $(".tab-content").children().each(function() {
            $(this).removeClass("active show");
        });
        $("#searchResults").remove();

        // Get contents from search box
        let searchTerm = $(this).val();

        // Find the streamers which match the query.
        let result = $("#allStreams").find($("#" + searchTerm));

        // Show the div
        let $searchResults = $("<div />").attr("id", "searchResults")
                .addClass("tab-pane fade in active show");
        $searchResults.append(result);
        $(".tab-content").append($searchResults);
    });
});
