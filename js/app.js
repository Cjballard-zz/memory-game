/*
 * Create a list that holds all of your cards
 Other global variables for stars, modal, arry for holding toggled cards, moves and timers.
 */

const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('ul.stars li');
const popup = document.querySelector('.popup');
const modal = document.querySelector('.modal');
const printout = document.querySelector('.printout');
let card = document.getElementsByClassName("card");
let cards = [...card];
let toggledCards = [];
let matched = 0;
const pairs = 8;
let moves = 0;
let timerStop = true;
let timerId;


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
function switchCards() {
    var shuffledCards = shuffle(cards);
    for (var i= 0; i < shuffledCards.length; i++){
       [].forEach.call(shuffledCards, function(item){
          deck.appendChild(item);
          card[i].classList.remove('show', 'open', 'match', 'unmatched');
          modal.classList.remove('show');
          popup.classList.remove('show');
          printout.classList.remove('show');
       });
    }
}


// Returning star ratings based on amount of moves a player makes.
function getScore() {
    // If given a certain number of moves, remove child stars from page.
    if (moves === 14) {
        document.querySelector('ul.stars').removeChild(stars[0]);
    }
    else if (moves === 24) {
        document.querySelector('ul.stars').removeChild(stars[1]);
    }
    else if (moves === 36)
        document.querySelector('ul.stars').removeChild(stars[2]);
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
function showTimer() {
    const timer = document.querySelector('.clock');
    timer.innerHTML = time;
    // Converts the time into readable format.
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
deck.addEventListener('click', function(event) {
    const clickTarget = event.target;
    // Identify list of valid click targets and exclude targets we don't want to be able to click.
    if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !clickTarget.classList.contains('match') && !toggledCards.includes(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        // Look for a match with the toggled cards.
        if (toggledCards.length === 2) {
            countMoves();
            findMatch(clickTarget);
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
function findMatch() {
    if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matched++;
        if (matched == pairs ) {
            modalData();
            resetTimer();
            resetMatched();
            showModal();
        }
    } 
    // Or else we time out the unmatched cards.
    else {
        setTimeout(function() {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 1000);
    }
};


// Reset the move count back to 0;
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}


// Adding stars back to reset the game rating.
function addStars() {
    if (document.querySelector('ul.stars').childElementCount === 2 ) {
        document.querySelector('ul.stars').appendChild(stars[0]);
    }
    else if (document.querySelector('ul.stars').childElementCount === 1 ) {
        document.querySelector('ul.stars').appendChild(stars[0]);
        document.querySelector('ul.stars').appendChild(stars[1]);
    }
    else if (document.querySelector('ul.stars').childElementCount === 0 ) {
        document.querySelector('ul.stars').appendChild(stars[0]);
        document.querySelector('ul.stars').appendChild(stars[1]);
        document.querySelector('ul.stars').appendChild(stars[2]);
    }
    else {};
} 


// Resetting a game should reset the timer, shuffle the cards and add the stars back.
function resetGame() {
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
document.querySelector('.retry').addEventListener('click', resetGame);


 // Showing the modal in its own function.
 function showModal() {
    popup.classList.add('show');
    modal.classList.add('show');
    printout.classList.add('show');
}


// Resets the 'matched' variable back to 0, so we can win after resetting the game.
function resetMatched() {
    matched = 0;
}

// Grabs a snapshot of data for the modal.
function modalData() {
    const clockTime = document.querySelector('.clock').innerHTML;
    const starsRating = document.querySelector('ul.stars').childElementCount;

    printout.innerHTML = `It took you ${clockTime}. You made ${moves} moves. Your star rating is ${starsRating}.`
}