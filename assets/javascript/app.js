$(document).ready(function () {

      //Array of Food and Drink
      var topics = ["Bacon", "Coffee", "Banana", "Cake", "Burrito", "Hot Dog", "Ice Cream", "Pizza", "Salad", "Steak", "Taco", "French Fries", "Vodka"];

      // Render HTML to display the appropiate content
      function displayfoodanddrinkInfo() {

            var topic = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=xcvJERHxACTID600aftT3tWzPMEh7PaK&limit=10";

            // Creating an AJAX call for food and drink being clicked
            $.ajax({
                  url: queryURL,
                  method: "Get"
            }).then(function (response) {

                  //Creating a div to hold the movie
                  var foodandDrinkDiv = $("<div class='foodandDrinks'>");

                  //Storing the rating data
                  var rating = response.Rated;

                  //Creating an element for rating display
                  var piOne = $("<p>").text("Rating: " + rating);

                  //Display the rating
                  foodandDrinkDiv.append(piOne);

                  // Storing the release year
                  var released = response.Released;

                  // Creating an element to hold the release year
                  var piTwo = $("<p>").text("Released: " + released);

                  // Displaying the release year
                  foodandDrinkDiv.append(piTwo);

                  // Retrieve the URL for the image
                  var imgURL = response.Poster;

                  // An element to hold the image
                  var image = $("<img>").attr("src", imgURL);

                  //Append the image
                  foodandDrinkDiv.append(image);

                  // Putting the entire food and drink above the previous food and drink
                  $("#foodanddrink").prepend(foodandDrinkDiv);

            });
      }

      //Function for displaying movie data
      function renderButtons() {

            // Delete the movies prior to adding new movies
            $("#foodanddrink-button").empty();

            //Looping through the array of food and drink
            for (var i = 0; i < foodandDrink.length; i++) {

                  //Generate button for each food and drink in the array
                  var a = $("<button>");

                  //Adding a class to the food and drink button
                  a.addClass("foodandDrink-btn");

                  // Adding a data attribute
                  a.attr("data-name", foodandDrink[i]);

                  //Providing the intial button text
                  a.text(foodandDrink[i]);

                  //Adding the button to foodanddrink-button div
                  $("#foodanddrink-button").append(a);
            }
      }

      // This function handles events where a foodanddrink button is clicked
      $("#add-foodanddrink").on("click", function (event) {
            event.preventDefault();

            // This line grabs the input from the textbox
            var foodandDrinks = $("#foodanddrink-input").val().trim();

            //Adding food and drink from the textbox to our array
            foodandDrink.push(foodandDrinks);

            // Process foodandDrink Array
            renderButtons();
      });

      // Adding a click event listener to all elements with a class of "foodanddrink-button"
      $(document).on("click", ".foodandDrink-btn", "displayfoodanddrinkInfo");

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
});