var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

// Restart Game Button

$('.restart').click(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
  $('.youwon').text('');
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  // Array for the sorted, unplaced cards
  var sortedCards = [];
  // Loop that pushes an int 1 - 12, twice, to the sortedCards array
  for (var i = 1; i < 13; i++) {
    sortedCards.push(i);
    sortedCards.push(i);
  }

  // Array for the randomly sorted, unplaced cards
  var randomCards = [];
  // Loop that pushes a value from a random index from sortedCards to randomCards
  // and splices out a value from the same random index from sortedCards
  while (sortedCards.length > 0) {
    var index = Math.floor(Math.random() * sortedCards.length);
    randomCards.push(sortedCards[index]);
    sortedCards.splice(index, 1);
  }

  return randomCards;

};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  // Array that stores the hsl color values as strings
  var colors = [
    'hsl(15, 85%, 65%)',
    'hsl(45, 85%, 65%)',
    'hsl(75, 85%, 65%)',
    'hsl(100, 85%, 65%)',
    'hsl(140, 85%, 65%)',
    'hsl(170, 85%, 65%)',
    'hsl(200, 85%, 65%)',
    'hsl(230, 85%, 65%)',
    'hsl(260, 85%, 65%)',
    'hsl(300, 85%, 65%)',
    'hsl(330, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  // Empty the $game object of all html
  $game.empty();

  // Create an empty array for flipped cards
  // Create data attribute on $game object of flipped cards
  $game.data('flippedCards', []);
  $game.data('playedCards', []);

  // Loop that iterates i < length of cardValues
  for (var i = 0; i < cardValues.length; i++) {
    // Create $card object with card HTML
    var $card = $('<div class="col-xs-3 card"></div>');

    // Create data attribute on $card object with a key of 'value'
    // and a value of current index of cardValues
    $card.data('value', cardValues[i]);
    // Create data attribute on $card object with a key of 'isFlipped'
    // and a value of false
    $card.data('isFlipped', false);
    // Create data attribute on $card object with a key of 'color'
    // and a value of the colors array, index equal to current index of
    // cardValues - 1
    $card.data('color', colors[(cardValues[i] - 1)]);

    // Append the $card object to the $game object
    $game.append($card);
  }

  // When a card is clicked call the flipCard method
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
    MatchGame.gameOver($('#game'));
  });

};

MatchGame.gameOver = function($game) {
  var playedCards = $game.data('playedCards');
  console.log(playedCards.length);
  if (playedCards.length === 12) {
    console.log("You Won");
    $('.youwon').text('You Won!!');
  }
}


/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  // Check to see if the card has already been flipped
  if ($card.data('isFlipped')) {
    return;
  }

  // Change the background color, text, and isFlipped values of the card
  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  // Push $card to the end of the $game flippedCards Array
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  // Check to see if $game flippedCards array has a length of 2 (2 cards flipped)
  if (flippedCards.length === 2) {
    // Check to see if $game flippedCards equal each other
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      // If flippedCards are equal change the background-color and color of cards
      flippedCards[0].css('background-color', 'rgb(153, 153, 153)')
                      .css('color', 'rgb(204, 204, 204)');
      flippedCards[1].css('background-color', 'rgb(153, 153, 153)')
                      .css('color', 'rgb(204, 204, 204)');
      var playedCards = $game.data('playedCards');
      playedCards.push($card);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      // Change back the background color, text, and isFlipped values of cards
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 250);
    }
    // Empty the flippedCards array
    $game.data('flippedCards', []);
  }

};
