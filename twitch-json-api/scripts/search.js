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

        let $searchResults = $("<div />").attr("id", "searchResults")
                .addClass("tab-pane fade in active show");

        // Find the streamers which match the query.
        $("#allStreams").children().each(function() {
            let regex = new RegExp(searchTerm, "i");
            console.log(regex.test($(this).attr("id")));
            if (regex.test($(this).attr("id"))) {
                // This is necessary so the panel doesn't vanish!
                let result = $(this).clone();
                $searchResults.append(result);
            }
        });

        // Show the div
        $(".tab-content").append($searchResults);
    });
});
