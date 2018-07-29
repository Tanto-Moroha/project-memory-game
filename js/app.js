/*
 * Create a list that holds all of your cards
 */

const cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-leaf', 'fa-leaf',
  'fa-cube', 'fa-cube',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame() {
  const deck = document.querySelector('.deck');
  const cardsHTML = shuffle(cards).map(function(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  });
  deck.innerHTML = cardsHTML.join('');
}

initGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let allCards = document.querySelectorAll('.card');
let openedCards = [];
let matchedCards = [];

allCards.forEach(function(card) {
  card.addEventListener('click', respondOnClick);
});

function respondOnClick(ev) {
  const card = ev.target;
  // Open a card if it wasn't opened or matched earlier
  if (!card.classList.contains('open') && !card.classList.contains('match')) {
    card.classList.add('open', 'show');
    openedCards.push(card);

    // If there are two cards opened check if they match
    if (openedCards.length === 2) {
      // They match, so change their classes and move to another array
      if (openedCards[0].dataset.card === openedCards[1].dataset.card) {
        openedCards.forEach(function(card) {
          card.classList.remove('open', 'show');
          card.classList.add('match');
          matchedCards.push(card);
        });
        openedCards = [];
      // They are diffrent, so clean their classes and clean an array
      } else {
        setTimeout(function() {
          openedCards.forEach(function(card) {
            card.classList.remove('open', 'show');
          });
          openedCards = [];
        }, 1000);
      }
    }
  }
}
