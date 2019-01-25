/*
 * Create a list that holds all of your cards
 Other global variables for stars, modal, arry for holding toggled cards, moves and timers.
 */

const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('ul.stars li');
const modal = document.querySelector('.modal');
let card = document.getElementsByClassName("card");
let cards = [...card];
let toggledCards = [];
let moves = 0;
let timerStop = true;
let timerId;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
};

// Loop through the cards, shuffle them and remove any classes.
function switchCards(){
    var shuffledCards = shuffle(cards);
    for (var i= 0; i < shuffledCards.length; i++){
       [].forEach.call(shuffledCards, function(item){
          deck.appendChild(item);
          card[i].classList.remove('show', 'open', 'match', 'unmatched');
       });
    }
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


// Returning star ratings based on amount of moves a player makes.
function getScore () {
    //If given a certain number of moves, remove child stars from page.
    if (moves > 8 && moves < 14) {
        document.querySelector('ul.stars').removeChild(stars[0]);
    }
    else if (moves >= 14 && moves < 18) {
        document.querySelector('ul.stars').removeChild(stars[0, 1]);
    }
    else if (moves >= 18)
        document.querySelector('ul.stars').removeChild(stars[0, 1, 2]);
}

// Count the number of moves and hit the getScore function to remove a star if necessary.
function countMoves() {
    moves++;
    const moveNumber = document.querySelector('.moves');
    moveNumber.innerHTML = moves;
    getScore();
}

// Start up the game timer.
function timerStart() {
    time = 0;
    timerId = setInterval(() => {
        time++;
        showTimer();
    }, 1000);
}

// Display the timer on the page and make it human-readable.
function showTimer () {
    const timer = document.querySelector('.clock');
    timer.innerHTML = time;

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    // Add a 0 if the second is below 10.
    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
    }
}

// Resets the timer.
function resetTimer() {
    clearInterval(timerId);
}

// Core matching logic – listen for a click, and if the click target is valid, take action.
deck.addEventListener('click', function () {
    const clickTarget = event.target;
    // Identify list of valid click targets and exclude targets we don't want to be able to click.
    if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !clickTarget.classList.contains('match') && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        // Look for a match with the toggled cards.
        if (toggledCards.length === 2) {
            findMatch(clickTarget);
            countMoves();
        // If the timer isn't running, start it up.
        if (timerStop) {
            timerStart();
            timerStop = false;
        }
        }
    }
});

// Flip our cards to active.
function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// Push the card to our toggledCards array.
function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
}

// Search to see if we have a match.
function findMatch () {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
    } else {
        setTimeout(function() {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    }
};

// Reset the move count back to 0;
function resetMoves () {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// add stars back
function addStars() {
    if (document.querySelector('ul.stars').childElementCount == 2 ) {
        document.querySelector('ul.stars').appendChild(stars[0]);
    }
    else if (document.querySelector('ul.stars').childElementCount == 1 ) {
        document.querySelector('ul.stars').appendChild(stars[0,1]);
    }
    else if (document.querySelector('ul.stars').childElementCount == 0 ) {
        document.querySelector('ul.stars').appendChild(stars[0,1,2]);
    }
    else {};
}

// Resetting a game should reset the timer, shuffle the cards and add the stars back.
function resetGame () {
    resetTimer();
    timerStop = true;
    time = 0;
    showTimer();
    resetMoves();
    addStars();
    switchCards();
}

// Reset the game on the restart button
document.querySelector('.restart').addEventListener('click', resetGame);
// Reset the game from the win modal.
document.querySelector('modal.show button').addEventListener('click', resetGame);

// Show the congratulations modal if all cards are matched.
function win() {
    if (toggledCards == 16) {
        timerStop();
        popup.classList.add('.show');
        modal.classList.add('.show');
    }
}