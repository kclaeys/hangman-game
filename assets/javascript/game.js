//To whomever has decided to help me and sees this, thank you for the help and sorry the code isn't the best//

/* KC:
Problems
	- says press any key, not all keys work (arrow keys) (keypress -> keydown)
	- group blocks of code that happen all at once into functionality groups - all css changes together, etc
	- dont need x === true/false, just use x and !x as they're booleans anyway
	- no need to pass event around if all you care about is event.key
	- be sure you're not passing/accepting inputs that aren't used
	- use an object/hash table to keep track of guessed letters instead of innerHTML
		- use html to display data, not keep track of it
	- in general, do/change/edit first then notify after with alerts and console
	- I repeat: GROUP BLOCKS OF CODE THAT DO SIMILAR THINGS TOGETHER
	- make functions that do specific things
	- rather than change display:none to display:block for multiple elements, just make pre-game html and game html,
		and show/hide based on whether the game has been started
	- no need for <p> around <button>

*/

//I just sorta named all my variables on the fly, there barely any rhyme or reason to the name choices, I hope they don't confuse you//
// KC: I find grouping them by type/use is helpful
// elements - use $ prefix to signify elements from dom. This is a common thing when using jQuery, but you can do it without as well
var $preGame = document.getElementById("pre-game");
var $duringGame = document.getElementById("during-game");
var $hangmanArea = document.getElementById("hangman-area");
var $hangmanWord = document.getElementById("hangman-word");
var $hangmanCounter = document.getElementById("hangman-counter");
var $hangmanGuesses = document.getElementById("hangman-guesses"); // KC: you made a bunch of others, make this one too
var $guessArea = document.getElementById("guess-area");
var $previousGuesses = document.getElementById("previous-guesses");
var $winCounter = document.getElementById("win-counter");
var $wins = document.getElementById("wins"); // KC: same as above
var $newWord = document.getElementById("new-word");

// statics and trackers
var wins = 0;
var hangmanGuesses = 12;
var remainingGuesses;
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
var j;
var wordInPlay;
var playArea;
var newPlayArea;
var correct;
// var win; KC: no longer needed
var correctLetters; // KC: I'm sure there's a better way to keep track of this and decide whether to win, but you can figure that out
var guessedLettersTable;
var guessedLettersString;
// KC: use a function to set up the new word that you can call in start game and in new game
function setupNewGame(){
	j = Math.floor(Math.random() * wordArray.length);
	wordInPlay = wordArray[j];
	playArea = [];
	newPlayArea = [];
	correct = false; // KC: if it's a boolean, use booleans, not null
	correctLetters = 0;

	guessedLettersTable = {};
	guessedLettersString = "";
	$previousGuesses.textContent = guessedLettersString;
	remainingGuesses = hangmanGuesses;
	$hangmanGuesses.textContent = remainingGuesses;
	$wins.textContent = wins;
	//underscore(event); // KC: unneccesary input - underscore doesn't take anything
	underscore(); // moved this into here as it's part of setting up the game
}

// KC: this belongs in your css if it's default - you can change it to whatever you need later
// it will clean up your js having the css separate
// $hangmanWord.style.display = "none";
// $hangmanCounter.style.display = "none";
// $guessArea.style.display = "none";
// $newWord.style.display = "none";
// $winCounter.style.display = "none";

//once any key is pressed then we start the game//
window.onload = function (){
	document.addEventListener("keydown", startGame, false);
};

function startGame(event){
	document.removeEventListener("keydown", startGame, false);

	// var j = Math.floor(Math.random() * wordArray.length); KC: this seems to not be used
	// KC: more css simplified stuff
	// $hangmanWord.style.display = "block";
	// $hangmanCounter.style.display = "block";
	// $guessArea.style.display = "block";
	// $winCounter.style.display = "block";
	// $newWord.style.display = "block";
	$preGame.classList.add("hide");
	$duringGame.classList.remove("hide");


	setupNewGame();

	//all functions based on key presses go under here//
	document.onkeydown = function(event){
		// KC: don't mutate the event, make a new variable
		//event.key = event.key.toLowerCase();
		var key = event.key.toLowerCase();
		if (event.keyCode >= 65 && event.keyCode <= 90) { // if key is letter
			// KC: shouldn't run correct and wrong guess for every letter guessed
			// when they guess it, check if they've guessed it, and if not, only do whichever one is relevant
			if (!alreadyGuessed(key)) { // KC: only care if they haven't guessed the letter
				if (wordInPlay.includes(key)) { // KC: if it's in the word, execute correctGuess
					correctGuess(key);
				} else { // KC: if not, execute wrongGuess
					wrongGuess(key);
				}
			}
			winCounting();
		}
	};
}

//function that turns the length of the word in play into underscores//
function underscore(){
	$hangmanWord.innerHTML = "";
	for (var i =0; i < wordInPlay.length; i++){
		var $underscore = document.createElement("span");
		var newId = "underscore" + [i];

		$underscore.textContent = "_";
		playArea.push($underscore);
		playArea[i].setAttribute("id", newId);
		$hangmanWord.appendChild($underscore);
	}
}

//this function is all about the win condition, it displays correctly guessed letters successfully, but doesn't apply the win condition properly, if you put in a correctly guessed letter twice it will count that point twice, meaning it's possible to win by typing one letter many times//
function correctGuess(key){
	console.log(key);
	for (var i = 0; i < wordInPlay.length; i++) {
		if (key === wordInPlay[i]) {
			// KC: only need to worry about this element if it's going to change
			var $letter = document.getElementById("underscore"+i);
			$letter.textContent = wordInPlay[i];
			correctLetters++;

			console.log("correct");
			console.log("correctLetters:" + correctLetters);
		}
	}
	// if (correctLetters === wordInPlay.length){
	// 	win = true;
	// }
	// KC: no need to keep track of win when correctLetters can tell you whether they won
}

//this function is all about losing, it's supposed to count down the wrong guesses by one per input but right now it is including correct guesses for some reason//
function wrongGuess(key){
	for(var i = 0; i < wordInPlay.length; i++){
		if (key !== wordInPlay[i]){
			correct = false;
		}
	}
	if (!correct){
		console.log("incorrect");
		remainingGuesses--;
	    $hangmanGuesses.textContent = remainingGuesses;
		// if (hangmanGuesses === 0){
		// 	win = false;
		// }
		// KC: no need to keep track of win when remainingGuesses can tell you whether they lost
	}
}

//I made the win and lose events their own separate function so that I could focus on fixing the win/lose conditions in my input functions//
function winCounting(){
	if (correctLetters === wordInPlay.length){
		wins++;
		$wins.textContent = wins;
		console.log("win");
		alert("You Win!");
	} else if (!remainingGuesses){ // KC: just check if there are remaining guesses
		console.log("lose");
		alert("You Lose!");
	}
}

//this function is supposed to display all my already guessed letters in an area of the page, but right now it repeats letters//
// function alreadyGuessed(key){
// 	for(i = 0; i < 1; i++){
// 		if(key !== previousGuesses.innerHTML[i]){
// 			$previousGuesses.innerHTML += key;
// 		}
// 	}
// }
function alreadyGuessed(key){
	var guessed = guessedLettersTable[key]; // figure out return value before updating it
	if (!guessedLettersTable[key]) {
		guessedLettersTable[key] = true;
		guessedLettersString += key;
	}
	$previousGuesses.textContent = guessedLettersString;

	// make this function return something so you can decide what to do based on whether it's been guessed
	return guessed;
}

//this button is supposed to reset just the word using javascript so that the game can be played offline, but it doesn't successfuly remove the word that's already there with a new array with a new length, it keeps the old length which makes the blank area way too big or small depending on the word//
$newWord.onclick = function reStartGame(event){
	setupNewGame();
	// this is created locally but never called - here or anywhere
	// function newUnderscore(event){
	// 	for (var i = 0; i < wordInPlay.length; i++){
	// 		console.log("this button works");
	// 		var $underscore = document.createElement("span");
	// 		$underscore.textContent = "_";
	// 		newPlayArea.push($underscore);
	// 		$hangmanWord.appendChild($underscore);
	// 		var newId = "underscore" + [i];
	// 		newPlayArea[i].setAttribute("id", newId);
	// 	}
	// }
};
