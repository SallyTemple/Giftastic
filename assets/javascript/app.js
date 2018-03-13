var topics = ["Bacon", "Coffee", "Banana", "Burrito", "Ice Cream", "Pizza", "Salad", "Steak", "Taco", "Vodka"];

// Render HTML to display the appropiate content
function foodGifs() {

      var topic = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=xcvJERHxACTID600aftT3tWzPMEh7PaK&limit=10";

      // Clear all image
      $("#restaurants").empty();

      // Creating an AJAX call for food and drink being clicked.
      $.ajax({
            url: queryURL,
            method: "GET"
      }).then(function (response) {
            var outcome = response.data;
            console.log("response");
            for (var i = 0; i < outcome.length; i++) {
                  var yum = $("<img>");
                  yum.attr("data-still", outcome[i].images.fixed_height_still.url);
                  yum.attr("data-animate", outcome[i].images.fixed_height.url);
                  yum.attr("src", outcome[i].images.fixed_height_still.url);
                  yum.attr("data-state", "still");
                  yum.attr("class", "snippet");
                  var rating = $("<p>").text("Rated: " + outcome[i].rating);

                  //Storing in each div
                  var driveThru = $("<div>").attr("id", topic + i);
                  driveThru.addClass("diner");
                  driveThru.prepend(rating);
                  driveThru.prepend(yum);
                  $("#divide").prepend(driveThru);
            }
            $(".snippet").on("click", function () {
                  var state = $(this).attr("data-state");
                  if (state == "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                  } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");

                  }
            });


      });
}

$(document).ready(function () {

      // This function handles events where a foodanddrink button is clicked
      $("#add-foodanddrink").on("click", function() {
            event.preventDefault();
            // This line grabs the input from the textbox
            var foodandDrinks = $("#foodanddrink-input").val().trim();
            $("#foodanddrink-input").val("");
            //Adding food and drink from the textbox to our array
            topics.push(foodandDrinks);
            // Process foodandDrink Array
            buttonOne();
            $(".foodandDrink-btn").on("click", foodGifs)
      });

      //Function for displaying food and drink data
      function buttonOne() {
            // Delete the food and drink prior to adding new food and drink options
            $("#foodanddrink-button").empty();
            //Looping through the array of food and drink
            for (var i = 0; i < topics.length; i++) {
                  //Generate button for each food and drink in the array
                  var pie = $("<button>");
                  //Adding a class to the food and drink button
                  pie.attr("class", "foodandDrink-btn");
                  // Adding a data attribute
                  pie.attr("data-name", topics[i]);
                  //Providing the intial button text
                  pie.text(topics[i]);
                  //Adding the button to foodanddrink-button div
                  pie.appendTo("#foodanddrink-button");
            }
      }

      // Calling the buttonOne function to display the intial buttons
      buttonOne();
      $(".foodandDrink-btn").on("click", foodGifs)
});