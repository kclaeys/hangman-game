//psudocode this shite! so we'll go for hangman//

//we need to call our variables//
var hangmanArea = document.getElementById("hangman-area");
var hangmanPrompt = document.getElementById("hangman-prompt");
var hangmanWord = document.getElementById("hangman-word");
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
var wordNumber = 0;
var wordArray = wordInPlay[wordNumber].split("");

//load state//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";

//something that turns the length of the word into underscores//
function underscore(event){
	var i;
	for (i = 0; i < wordArray.length; i++){
		wordArray[i] = "_"
		hangmanWord.innerHTML = wordArray;
		if (event.key == wordInPlay[0]){
			console.log("correct");
			wordArray[i] = event.key;
		}
	}
}

//once any key is pressed then we start the game//
function startGame(event){
	console.log(event.key);
	hangmanPrompt.textContent = "This is your word, try to guess it before you run out of guesses!";
	hangmanWord.style.display = "block";
	underscore(event);
	hangmanCounter.style.display = "block";
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	guessArea.style.display = "block";
	newWord.style.display = "block";
};

//correct guesses get displayed//
/*function guessDisplay(event){
	if (event.key == wordArray[0]){
		hangmanWord.innerHTML = wordArray.splice(0,1,wordArray[0]);
	}
}*/

//wrong guesses cound down//
/*function guessCounter(event){
	if (event.key !== )
	console.log("counter works")
	hangmanGuesses--;
};*/

//all functions based on key presses//
document.onkeypress = function(event){
	startGame(event);
	/*guessCounter(event);*/
};

//click to get a new word//
newWord.onclick = function getNewWord(event){
	console.log("this button works");
	if (wordNumber == wordInPlay.length - 1){
		wordNumber = 0
	} else {
		wordNumber++;
	};
	var wordArray = wordInPlay[wordNumber].split("");
	hangmanGuesses == 12;
}
