var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded
  Renders a 4x4 board of cards
*/

$(document).ready(function() {
  var $game = $('#game');
  $game.data('gameSize', 8);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
});


/*
  Restarts the Game
  Renders a board size of cards equal to the previous game size
*/

$('.restart').click(function() {
  var $game = $('#game');
  var gameSize = $game.data('gameSize');
  $game.data('gameSize', gameSize);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
  $('.youwon').text('');
});


/*
  Allows user to select the size of the game
  smallgame = 4x4 cards
  mediumgame = 4x6 cards
  largegame = 4x8 cards
*/

$('.smallgame').click(function() {
  var $game = $('#game');
  $game.data('gameSize', 8);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
});

$('.mediumgame').click(function() {
  var $game = $('#game');
  $game.data('gameSize', 12);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
});

$('.largegame').click(function() {
  var $game = $('#game');
  $game.data('gameSize', 18);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
});


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function ($game) {
  // Array for the sorted, unplaced cards
  var sortedCards = [];

  // Array of card values
  $game.data('cardIcons', [
                            '<i class="glyphicon glyphicon-plus"></i>',
                            '<i class="glyphicon glyphicon-minus"></i>',
                            '<i class="glyphicon glyphicon-cloud"></i>',
                            '<i class="glyphicon glyphicon-music"></i>',
                            '<i class="glyphicon glyphicon-heart"></i>',
                            '<i class="glyphicon glyphicon-star"></i>',
                            '<i class="glyphicon glyphicon-cog"></i>',
                            '<i class="glyphicon glyphicon-home"></i>',
                            '<i class="glyphicon glyphicon-camera"></i>',
                            '<i class="glyphicon glyphicon-leaf"></i>',
                            '<i class="glyphicon glyphicon-bell"></i>',
                            '<i class="glyphicon glyphicon-wrench"></i>',
                            '<i class="glyphicon glyphicon-tree-conifer"></i>',
                            '<i class="glyphicon glyphicon-knight"></i>',
                            '<i class="glyphicon glyphicon-apple"></i>',
                            '<i class="glyphicon glyphicon-hourglass"></i>',
                            '<i class="glyphicon glyphicon-scissors"></i>',
                            '<i class="glyphicon glyphicon-piggy-bank"></i>',
                            ]);

  var cardIcons = $game.data('cardIcons');

  var gameSize = $game.data('gameSize');

  // Loop that pushes an int range from 1 to gameSize, twice, to the sortedCards array
  for (var i = 0; i < gameSize; i++) {
    sortedCards.push(i);
    sortedCards.push(i);
  }

  console.log(sortedCards);

  // Array for the randomly sorted, unplaced cards
  var randomCards = [];

  // Loop that pushes a value from a random index from sortedCards to randomCards
  // and splices out a value from the same random index from sortedCards
  while (sortedCards.length > 0) {
    var index = Math.floor(Math.random() * sortedCards.length);
    randomCards.push(sortedCards[index]);
    sortedCards.splice(index, 1);
  }

  // Global counter for total cards for a game instance
  $game.data('totalCards', randomCards.length);

  return randomCards;

};


/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  // Array that stores the hsl color values as strings
  var colors = [
    'hsl(10, 85%, 65%)',
    'hsl(30, 85%, 65%)',
    'hsl(50, 85%, 65%)',
    'hsl(70, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(110, 85%, 65%)',
    'hsl(130, 85%, 65%)',
    'hsl(150, 85%, 65%)',
    'hsl(170, 85%, 65%)',
    'hsl(190, 85%, 65%)',
    'hsl(210, 85%, 65%)',
    'hsl(230, 85%, 65%)',
    'hsl(250, 85%, 65%)',
    'hsl(270, 85%, 65%)',
    'hsl(290, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(330, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  // Empty the $game object of all html
  $game.empty();

  // Create an empty array for flipped cards
  // Create data attribute on $game object of flipped cards
  $game.data('flippedCards', []);
  $game.data('playedCards', []);

  var cardIcons = $game.data('cardIcons');

    // Loop that iterates i < length of cardValues
  for (var i = 0; i < cardValues.length; i++) {
    var gameSize = $game.data('gameSize');
    // If gameSize is large
    if (gameSize === 18) {
      // Create $card object with card HTML
      var $card = $('<div class="col-xs-2 card"></div>');

      $card.data('value', cardValues[i]);
      $card.data('icon', cardIcons[cardValues[i]]);
      $card.data('isFlipped', false);
      $card.data('color', colors[cardValues[i]]);

      console.log($card.data('value'));
      console.log($card.data('icon'));

      // Append the $card object to the $game object
      $game.append($card);

    // Else the gameSize is Medium or Small
    } else {

      // Create $card object with card HTML
      var $card = $('<div class="col-xs-3 card"></div>');

      $card.data('value', cardValues[i]);
      $card.data('icon', cardIcons[cardValues[i]]);
      $card.data('isFlipped', false);
      $card.data('color', colors[cardValues[i]]);

      console.log($card.data('value'));
      console.log($card.data('icon'));

      // Append the $card object to the $game object
      $game.append($card);
    }
  }

  // When a card is clicked call the flipCard method
  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
    MatchGame.gameOver($('#game'));
  });

};


/*
  Checks to see if the number of played cards = the total number of cards.
  If so, display the You Win overlay element
 */

MatchGame.gameOver = function($game) {
  var playedCards = $game.data('playedCards');
  var totalCards = $game.data('totalCards');
  if (playedCards.length === totalCards) {
    $('#overlay').css('display', 'block');
  }
}


/*
  Hides You Win overlay element
  Resets the game at the previous game size
 */

$('#overlay').click(function() {
  $('#overlay').css('display', 'none');
  var $game = $('#game');
  var gameSize = $game.data('gameSize');
  $game.data('gameSize', gameSize);
  var values = MatchGame.generateCardValues($game);
  MatchGame.renderCards(values, $game);
});


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
      .append($card.data('icon'))
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
      playedCards.push(flippedCards[0]);
      playedCards.push(flippedCards[1]);
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
