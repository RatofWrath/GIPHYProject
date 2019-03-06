var topics = ["Rat", "Turtle", "Cat", "Walrus", "Gorilla", "Penguin", "Hampster", "Bearded Dragon",
 "Tapir", "Otter", "Elephant", "Guinea Pig", "Orangutan", "Whale",
  "Degu", "Gopher", "Badger", "Hippo", "Lizard", "Polar Bear", "Manatee"];

function createButtonArray(){
  for(i = 0; i < topics.length; i++){
    //buttonArray += "<button id = " + topics[i] + " class = 'animalButton' type = 'button' onclick='generateGIFS()'>" + topics[i] + "</button>";
    var btn = $("<button>");
    btn.addClass("animalButton");
    btn.attr("data-name", topics[i]);
    btn.text(topics[i]);
    $("#buttonSet").append(btn);
  }
}

createButtonArray();

$(":button").on("click", function(){
  $('#gifSet').empty();
  console.log(this);
  var animal = $(this).attr("data-name");
  console.log(animal);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=OiReJ1eXuwd0M0d6X6quP6UK1cViuUtw&limit=10";
  console.log(queryURL);


  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    var results = response.data;
    console.log(results);
    for(i = 0; i < results.length; i++){
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p id='ratingText'>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("height", 300);
      animalImage.attr("width", 300);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      gifDiv.append(p);
      gifDiv.append(animalImage);
      $("#gifSet").prepend(gifDiv);
    }
  })
}
);

$(document).on("click", "img", function() {
  var state = $(this).attr("data-state");
  if (state === "still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }

  else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
