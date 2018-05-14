$(document).ready(function() {
    alert("jQuery is working");
    $("#searchBox").keyup(function() {
        let searchTerm = $("#searchBox").val();
        if (searchTerm != '') {
            // It works!
            // $("#searchResults").prepend("<p>" + searchTerm + "</p>");
            // Make API request
            $.getJSON("", function(data) {
                $("#searchResults").html(data);
            });
        } else {
            $("#searchResults").html('');
        }

    });
});
