/*
 * Create a list that holds all of your cards
 */

const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};



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

//timer 

// move counter
function countMoves() {
    moves++;
    const moveNumber = document.querySelector('.moves');
    moveNumber.innerHTML = moves;
}

const stars = document.querySelectorAll('ul.stars');

// remove stars
function hideStars () {
    if (moves > 2) {
        document.querySelector('ul.stars').removeChild(stars[0]);
    }
}


// Listen for clicks
deck.addEventListener('click', function () {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !clickTarget.classList.contains('match') && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            findMatch(clickTarget);
            countMoves();
        }
    }
});

// Notes here
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Notes here
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// Notes here
function findMatch () {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];

    } else {
        setTimeout(function() {
            console.log('No match');
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    }
};