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
	"apricot"
	];
var wordInPlay = wordArray[Math.floor(Math.random() * wordArray.length)];
var playArea = [];

//load state//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";

//something that turns the length of the word into underscores//
function underscore(){
	for (i = 0; i < wordInPlay.length; i++){
		var letter = document.createElement("span");
		letter.textContent += "_";
		playArea.push(letter);
		hangmanWord.appendChild(letter);
		var newId = "letter" + [i]
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
	hangmanCounter.style.display = "block";
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	guessArea.style.display = "block";
	newWord.style.display = "block";
	underscore(event);
};

document.onkeypress = function(event){
	console.log(event.key);
	for(i = 0; i < wordInPlay.length; i++){
		if (event.key === wordInPlay[i]){
			console.log("correct");
			
		}
	}
	if (playArea === wordInPlay){
		console.log("win");
		alert("You Win!");
	}
}

//correct guesses get displayed//
/*function guessDisplay(event){
	
	}
}*/

//wrong guesses cound down//
/*function guessCounter(event){
	if (event.key !== )
	console.log("counter works")
	hangmanGuesses--;
};*/

//all functions based on key presses//

//click to get a new word//
/*newWord.onclick = function getNewWord(event){
	console.log("this button works");
	location.reload(false);
}*/