/*
 * Create a list that holds all of your cards
 Other global variables for stars, modal, arry for holding toggled cards, moves and timers.
 */

const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('ul.stars li');
const modal = document.querySelector('.modal');
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

// Returning star ratings based on amount of moves a player makes.
function getScore () {
    //If given a certain number of moves, remove child stars from page.
    if (moves > 8 && moves < 14) {
        document.querySelector('ul.stars').removeChild(stars[0]);
    }
    else if (moves >= 14 && moves < 18) {
        document.querySelector('ul.stars').removeChild(stars[0, 1]);
    }
    else if (moves >=18)
        document.querySelector('ul.stars').removeChild(stars[0, 1, 2]);
}

// Count the number of moves and hit the getScore function to remove a star if necessary.
function countMoves() {
    moves++;
    const moveNumber = document.querySelector('.moves');
    moveNumber.innerHTML = moves;
    getScore();
}

// Start the game timer.
function timerStart() {
    time = 0;
    timerId = setInterval(() => {
        time++;
        showTimer();
        console.log(time);
    }, 1000);
}

// Display the timer on the page and make it human-readable.
function showTimer () {
    const timer = document.querySelector('.clock');
    console.log(timer);
    timer.innerHTML = time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
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
    console.log(toggledCards);
}

// Search to see if we have a match.
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

// Show the congratulations modal if all cards are matched.
function win() {
    if (toggledCards == 16) {
        timerStop();
        popup.classList.add("show");
    }
}