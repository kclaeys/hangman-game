//psudocode this shite! so we'll go for hangman//

//we need to call our variables//
var hangmanArea = document.getElementById("hangman-area");
var hangmanPrompt = document.getElementById("hangman-prompt");
var hangmanWord = document.getElementById("hangman-word");
var hangmanLetter = document.getElementsByClassName("hangman-letter")
var hangmanCounter = document.getElementById("hangman-counter");
var hangmanGuesses = 12;
var word1 = ["w","o","r","d","1"];
var guessArea = document.getElementById("guess-area");
var previousGuesses = document.getElementById("previous-guesses");
var newWord = document.getElementById("new-word");

//press any key to get started//
hangmanPrompt.textContent = "Press any key to get started!";
hangmanWord.style.display = "none";
hangmanCounter.style.display = "none";
guessArea.style.display = "none"
newWord.style.display = "none";

//something that turns the length of the word into underscores//

//once a key is pressed then we start the game//
document.onkeypress = function(){
	console.log("key press received")
	hangmanPrompt.textContent = "This is your word, try to guess it before you run out of guesses!";
	hangmanLetter.textContent = "_";
	hangmanWord.style.display = "block";
	hangmanCounter.style.display = "block";
	document.getElementById("hangman-guesses").textContent = hangmanGuesses;
	guessArea.style.display = "block";
	newWord.style.display = "block";
};

//function that displays correctly guessed letters and counts down wrong guesses//

//click to get a new word//
newWord.onclick = function getNewWord(){
	console.log("this button works")
}