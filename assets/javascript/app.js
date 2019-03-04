var topics = ["Rat", "Turtle", "Cat", "Walrus", "Gorilla", "Penguin", "Hampster", "Bearded Dragon",
 "Tapir", "Otters", "Elephant", "Guinea Pig", "Orangutan", "Whale",
  "Degu", "Snake", "Badger", "Aligator", "Iguana", "Polar Bear", "Manatee"];

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

function generateGIFS(){
  $('#gifSet').empty();
  var animal = $(this).attr("data-name");
  console.log(animal);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    var imageURL = response.data.image_original_url;

    var animalImage = $("<img>");
    animalImage.attr("src", imageURL);
    animalImage.attr("alt", "A generated image");

    $("#gifSet").prepend(animalImage);
  })
}


function changeAnimation(){

}

$(":button").on("click", function(){
  generateGIFS(btn);
})


createButtonArray();