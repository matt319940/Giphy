// array of strings
var topics = ["Always Sunny", "Dayman", "Charlie Day", "Sweet Dee", "Fat Mac", "Dennis Reynolds", "Frank Reynolds"];

function displayButtons(){
    for(var i = 0; i < topics.length; i++){
        $("#topics").append('<button type="button" class="btn btn-secondary gif">' + topics[i] + '</button>')
    }
}

displayButtons();

// adds searched items to the topics array
$("#search").on("click", function(event){
    var input = $("#input").val();
    topics.push(input);
    clear();
    displayButtons();
});

function clear(){
    $("#topics").html("");
}

$(document).on("click", ".gif", function() {
    var search = $(this).html();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=PNJ74WOLCLf2Ofpq1P0T8yRwB9vaGMDs&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#images").html("");
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<span>");
            var p = $("<p>");
            p.text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifImage.attr("play", results[i].images.fixed_height.url);
            gifImage.attr("pause", results[i].images.fixed_height_still.url);
            gifImage.attr("status", "paused");

            $(gifDiv).append(gifImage);
            $(gifDiv).append(p);
            $("#images").append(gifDiv); 
        }
    });
  });

$(document).on("click", "img", function(){
    if($(this).attr("status") == "paused"){
        $(this).attr("status", "play");
        var play = $(this).attr("play");
        $(this).attr("src", play);
    }
    else{
        $(this).attr("status", "paused");
        var pause = $(this).attr("pause");
        $(this).attr("src", pause);
    }
});