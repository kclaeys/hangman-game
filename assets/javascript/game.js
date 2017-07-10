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
var j = Math.floor(Math.random() * wordArray.length)
var wordInPlay = wordArray[j];
var playArea = [];
var newPlayArea = [];
var guessedArray = [];

//load state//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";

//something that turns the length of the word into underscores//
function underscore(){
	for (i = 0; i < wordInPlay.length; i++){
		var underscore = document.createElement("span");
		underscore.textContent += "_";
		playArea.push(underscore);
		hangmanWord.appendChild(underscore);
		var newId = "underscore" + [i]
		playArea[i].setAttribute("id", newId);
	}
}

//once any key is pressed then we start the game//
window.onload = function (){
	document.addEventListener("keypress", startGame, false);
}

function startGame(event){
	document.removeEventListener("keypress", startGame, false);
	hangmanPrompt.textContent = "This is your word, try to guess it before you run out of guesses!";
	hangmanWord.style.display = "block";
	var j = Math.floor(Math.random() * wordArray.length)
	hangmanCounter.style.display = "block";
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	guessArea.style.display = "block";
	newWord.style.display = "block";
	underscore(event);
};

//correct guesses get displayed//
function correctGuess(event){
	console.log(event.key);
	for(i = 0; i < wordInPlay.length; i++){
		var letter = document.getElementById("underscore"+i);
		if (event.key === wordInPlay[i]){
			console.log("correct");
			letter.textContent = wordInPlay[i];
		}
	}
}

//wrong guesses cound down//
function wrongGuess(event){
	for(i = 0; i < 1; i++){
		if (event.key !== wordInPlay[i]){
			console.log("incorrect");
			hangmanGuesses--;
			document.getElementById("hangman-guesses").textContent = hangmanGuesses;
		}
		if (hangmanGuesses == 0){
			console.log("lost")
			alert("You Lost!");
		}
	}
};

/*function winOrLose(){
	for(i = 0; i < wordInPlay.length; i++){
		var playWord = document.getElementById("underscore"+i).textContent;
	}
	if (playWord === wordInPlay){
		console.log("win");
	}
}*/

function alreadyGuessed(event){
	console.log("counter works");
	for(i = 0; i < 1; i++){
		var keyIn = document.createElement("span");
		if(event.key !== guessedArray[i]){
			keyIn.textContent += event.key
			guessedArray.push(keyIn);
			previousGuesses.appendChild(keyIn);
		}
	}
}

//all functions based on key presses//
document.onkeypress = function(event){
	event.key = event.key.toLowerCase();
	correctGuess(event);
	/*winOrLose(event);*/
	alreadyGuessed(event);
	wrongGuess(event);
}

//click to get a new word//
newWord.onclick = function reStartGame(event){
	console.log("this button works");
	j = Math.floor(Math.random() * wordArray.length);
	wordInPlay = wordArray[j];
	for (i = 0; i < wordInPlay.length; i++){
		hangmanWord.removeChild(document.getElementById("underscore"+i));
		console.log("forloop works");
	}
}

/*var newUnderscore = document.createElement("span");
	newUnderscore.textContent += "_";
	newPlayArea.push(newUnderscore);
	hangmanWord.appendChild(newUnderscore);
	var newId = "underscore" + [i];
	newPlayArea[i].setAttribute("id", newId);*/