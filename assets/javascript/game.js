//psudocode this shite! so we'll go for hangman//

//we need to call our variables//
var hangmanArea = document.getElementById("hangman-area");
var hangmanPrompt = document.getElementById("hangman-prompt");
var hangmanWord = document.getElementById("hangman-word");
var hangmanCounter = document.getElementById("hangman-counter");
var hangmanGuesses = 12;
var guessArea = document.getElementById("guess-area");
var previousGuesses = document.getElementById("previous-guesses");
var winCounter = document.getElementById("win-counter");
var wins = 0;
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
var win = null;

//load state//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none";
newWord.style.display = "none";
winCounter.style.display = "none";

//something that turns the length of the word into underscores//
function underscore(){
	for (i = 0; i < wordInPlay.length; i++){
		var underscore = document.createElement("span");
		underscore.textContent = "_";
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
	winCounter.style.display = "block";
	document.getElementById("wins").textContent = wins;
	newWord.style.display = "block";
	underscore(event);
	//all functions based on key presses go under here//
	document.onkeypress = function(event){
		event.key = event.key.toLowerCase();
		correctGuess(event);
		alreadyGuessed(event);
		wrongGuess(event);
	}
	function winCounting(event){
		if (win = true){
			console.log("win");
			alert("You Win!");
			wins++;
			document.getElementById("wins").textContent = wins;
		}
	}
};

//this function is all about the win condition, it displays correctly guessed letters successfully, but doesn't apply the win condition properly, if you put in a correctly guessed letter twice it will count that point twice, meaning it's possible to win by typing one letter many times//
var counter = 0;
function correctGuess(event){
	console.log(event.key);
	for(i = 0; i < wordInPlay.length; i++){
		var letter = document.getElementById("underscore"+i);
		if (event.key === wordInPlay[i]){
			console.log("correct");
			letter.textContent = wordInPlay[i];
			counter++;
			console.log("counter:"+counter);
		}
	}
	if (counter === wordInPlay.length){
		win = true
	}
}

//this function is all about losing, it came close, but it iterates on every letter every time, meaning you may be correct for one letter of the word but not for the others, therfore each correct letter could be worth 1 correct and 4 or 5 wrongs//
function wrongGuess(event){
	for(i = 0; i < 1; i++){
		if (event.key === wordInPlay[i]){
			hangmanGuesses = hangmanGuesses;
		} else if (event.key !== wordInPlay[i]){
			console.log("incorrect");
			hangmanGuesses = hangmanGuesses - 1;
			document.getElementById("hangman-guesses").textContent = hangmanGuesses;
		}
	}
	if (hangmanGuesses == 0){
		console.log("lost")
		alert("You Lost!");
	}
};

//this function is supposed to display all my already guessed letters in an area of the page, but right now it repeats letters
function alreadyGuessed(event){
	for(i = 0; i < 1; i++){
		if(event.key !== previousGuesses.innerHTML[i]){
			previousGuesses.innerHTML += event.key;
		}
	}
}

//this button is supposed to reset just the word using javascript so that the game can be played offline, but it doesn't successfuly remove the word that's already there with a new array with a new length, it keeps the old length which makes the blank area way too big or small depending on the word//
newWord.onclick = function reStartGame(event){
	j = Math.floor(Math.random() * wordArray.length);
	wordInPlay = wordArray[j];
	function newUnderscore(event){
		for (i = 0; i < wordInPlay.length; i++){
			console.log("this button works");
			var underscore = document.createElement("span");
			underscore.textContent = "_";
			newPlayArea.push(underscore);
			hangmanWord.appendChild(underscore);
			var newId = "underscore" + [i]
			newPlayArea[i].setAttribute("id", newId);
		}
	}
}
