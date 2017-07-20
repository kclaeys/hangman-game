// hangman game
// ----------------------------------------------------------------------
/////////////////////////////////////////////////////////// variables
// screen dom variables
var $introScreen = document.getElementById("intro-screen");
var $gameScreen = document.getElementById("game-screen");

// label dom variables
var $guessCounter = document.getElementById("guess-counter");
var $guessTracker = document.getElementById("guess-tracker");
var $winCounter = document.getElementById("win-counter");
var $newWord = document.getElementById("new-word");

// data diplay dom variables
var $winLoseText = document.getElementById("win-lose-text");
var $wordInProgress = document.getElementById("word-in-progress");
var $guessesRemaining = document.getElementById("guesses-remaining");
var $guessedLetters = document.getElementById("guessed-letters");
var $wins = document.getElementById("wins");

// statics
var defaultGuesses = 5;
var wordArray = [
	"apple",
	"orange",
	"pear",
	"apricot",
	"watermelon",
	"guava",
	"avocado",
	"plum"
];

// data to track
var random;
var wordInPlay;
var wordInProgress;
var guessesRemaining;
var guessedLetters;
var wins = 0;

/////////////////////////////////////////////////////////// functions
// changing from intro to game screen
function setupFirstGame(event) {
	// stop the event from being treated as a guess
	event.stopImmediatePropagation();
	event.preventDefault();

	$introScreen.classList.add("hide"); // hide intro screen
	$gameScreen.classList.remove("hide"); // show game screen
	setupNewGame(); // setup a new game
	window.removeEventListener("keydown", setupFirstGame); // stop listening for setting up the first game
	window.addEventListener("click", clickHandler); // start listening for clicks (for new word)
	window.addEventListener("keypress", keyHandler); // start listening for guesses
}

// reset the game to defaults
function setupNewGame() {
	// reset existing data
	random = Math.floor(Math.random() * wordArray.length);
	wordInPlay = wordArray[random]; // pick a random word
	wordInProgress = "_".repeat(wordInPlay.length);
	guessesRemaining = defaultGuesses; // reset remaining guesses
	guessedLetters = {}; // reset guessed letters

	// update dom
	$winLoseText.textContent = "";
	$wordInProgress.textContent = wordInProgress.split("").join(" "); // added a space for visibility
	$guessesRemaining.textContent = guessesRemaining;
	$guessedLetters.textContent = Object.keys(guessedLetters).join(", ");
	$wins.textContent = wins;
}

function clickHandler(event) {
	if (event.target === $newWord) { // if they clicked new word
		setupNewGame(); // set up a new game
	}
}

// handle key events
function keyHandler(event) {
	if (event.key.match(/[A-z]/g)) { // if key pressed is a letter a-z
		if (!guessedLetters[event.key]) { // if the letter hasn't been guessed
			// set the letter as guessed, and reflect that on the ui
			guessedLetters[event.key] = true;
			$guessedLetters.textContent = Object.keys(guessedLetters).join(", ");

			// handle the guess
			if (wordInPlay.includes(event.key)) { // if the letter is in the word
				correctGuess(event); // handle a correct guess
			} else {
				wrongGuess(event); // handle a wrong guess
			}
		}
	}
}

// handle a correct guess, given the correct guess key event
function correctGuess(event) {
	var i = 0;
	var index;

	// find and replace all occurrences of the letter in the word in progress
	while (wordInPlay.indexOf(event.key, i) >= 0) {
		index = wordInPlay.indexOf(event.key, i); // find index of letter
		i = index + 1; // update start index for search
		wordInProgress = wordInProgress.slice(0, index) + event.key + wordInProgress.slice(index + 1); // replace the corresponding _ from the word in progress
	}

	// update the ui
	$wordInProgress.textContent = wordInProgress.split("").join(" ");

	// due to a correct guess, check for and handle a possible win
	checkWin();
}

// handle a wrong guess, given the wrong guess key event
function wrongGuess(event) {
	// decrement the remaining guesses and reflect it in the ui
	guessesRemaining--;
	$guessesRemaining.textContent = guessesRemaining;

	// due to a correct guess, check for and handle a possible loss
	checkLoss();
}

// check for and handle a win
function checkWin() {
	if (wordInPlay === wordInProgress.replace(/\s/g, "")) { // if the word in play is the same as the word in progress (without spaces)
		// increment wins and reflect it in the ui
		wins++;
		$wins.textContent = wins;

		// finish the game with a win
		finishGame(true);
	}
}

// check for and handle a loss
function checkLoss() {
	if (guessesRemaining < 0) {
		// finish the game with a loss
		finishGame(false);
	}
}

// display game end alert
function finishGame(won) {
	// show relevant text based on whether the player won
	var finishText = won ? "You win!" : "You lost";
	$winLoseText.textContent = finishText;
}

// set up and start the first game, but only listen for this event once
window.addEventListener("keydown", setupFirstGame, { once: true });
