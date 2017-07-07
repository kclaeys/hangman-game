//psudocode this shite! so we'll go for hangman//

//we need to call our variables//
var hangmanArea = document.getElementById("hangman-area");
var hangmanPrompt = document.getElementById("hangman-prompt");
var hangmanWord = document.getElementById("hangman-word");
var letter1 = document.getElementById("letter1");
var letter2 = document.getElementById("letter2");
var letter3 = document.getElementById("letter3");
var letter4 = document.getElementById("letter4");
var letter5 = document.getElementById("letter5");
var letter6 = document.getElementById("letter6");
var letter7 = document.getElementById("letter7");
var hangmanCounter = document.getElementById("hangman-counter");
var hangmanGuesses = 12;
var guessArea = document.getElementById("guess-area");
var previousGuesses = document.getElementById("previous-guesses");
var newWord = document.getElementById("new-word");
var wordInPlay = [
	"apple",
	"orange",
	"pear",
	"apricot"
	];
var i = 0;
var wordArray = wordInPlay[0].split("");

//load state//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";

//something that turns the length of the word into underscores//
/*function underscore(){
	var wordArrayUnderscore = wordArray.splice(0, wordInPlay.length, "-")
}*/

//once any key is pressed then we start the game//
function startGame(event){
	console.log(event.key);
	hangmanPrompt.textContent = "This is your word, try to guess it before you run out of guesses!";
	hangmanWord.style.display = "block";
	letter1.textContent = "_";
	letter2.textContent = "_";
	letter3.textContent = "_";
	letter4.textContent = "_";
	letter5.textContent = "_";
	letter6.textContent = "_";
	letter7.textContent = "_";
	hangmanCounter.style.display = "block";
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	guessArea.style.display = "block";
	newWord.style.display = "block";
};

//correct guesses show the word while wrong guesses cound down the guesses//
function guessCounter(event){
	if (event.key == wordArray[0]){
		letter1.textContent = wordArray[0];
	}
	if (event.key == wordArray[1]){
		letter2.textContent = wordArray[1];
	}
	if (event.key == wordArray[2]){
		letter3.textContent = wordArray[2];
	}
	if (event.key == wordArray[3]){
		letter4.textContent = wordArray[3];
	}
	if (event.key == wordArray[4]){
		letter5.textContent = wordArray[4];
	}
	if (event.key == wordArray[5]){
		letter6.textContent = wordArray[5];
	}
	if (event.key == wordArray[6]){
		letter7.textContent = wordArray[6];
	}
	else {
		console.log("counter works")
		hangmanGuesses--;
	}
};

//function that displays correctly guessed letters and counts down wrong guesses//
document.onkeypress = function(event){
	startGame(event);
	guessCounter(event);
};

//click to get a new word//
newWord.onclick = function getNewWord(event){
	console.log("this button works");
	if (i == wordInPlay.length - 1){
		i = 0
	} else {
		i++;
	};
	var wordArray = wordInPlay[i].split("");
	hangmanGuesses == 12;
}
