// Get username
document.getElementById("username-modal").style.visibility = "visible";

// Prevent page refresh on Enter
document.getElementById('username-form').addEventListener('submit', function(event) {
	event.preventDefault();
});

var nameInput = document.getElementById("username-field");

function submitName() {
	document.getElementById("username-modal").style.visibility = "hidden";
	document.getElementById("hello-message").innerHTML = "Hello, " + nameInput.value + ". Do you like kittens?";
	document.getElementById("psychopath-test-form").style.visibility = "visible";
}

// Submit username with Enter key
nameInput.addEventListener("keyup", function(event) {
    // event.preventDefault();
    if (event.keyCode === 13) {
        submitName();
    }
});


// Psychopath test
var isSane;
function isSane() {
	document.getElementById("psychopath-test-form").style.visibility = "hidden";
	document.getElementById("not-psychopath-modal").style.visibility = "visible";
	console.log(nameInput.value + " is not a psychopath.");
	isSane = "yes";
	return isSane;
}
function notSane() {
	document.getElementById("psychopath-test-form").style.visibility = "hidden";
	document.getElementById("is-psychopath-modal").style.visibility = "visible";
	console.log(nameInput.value + " is a psychopath.");
	isSane = "no";
	return isSane;
}

// Guess the kitten game
function playGame() {
	document.getElementById("incorrect-guess-modal").style.visibility = "hidden";
	document.getElementById("not-psychopath-modal").style.visibility = "hidden";
	document.getElementById("guess-modal").style.visibility = "visible";
}

// Kittens array of objects of array. TO UPDATE, BE SURE TO ADD KITTEN IN SAME TOP-BOTTOM ORDER AS IN HTML!
var kittens = [{
	name: "Tony",
	traits: ["disgusting", "stinky", "disabled", "flawless", "of a big plop"],
	image: "cat-imgs/Tony.jpg"
},
{
	name: "Franklin",
	traits: ["poopy", "loud", "cross-eyed", "idiotic", "handsome"],
	image: "cat-imgs/Franklin.jpg"
},
{
	name: "Noodle",
	traits: ["Italian", "runty", "cunty", "little", "stunty"],
	image: "cat-imgs/Noodle.jpg"
},
{
	name: "Liberace",
	traits: ["hyper", "adventurous", "smelly in the butt region", "deceased", "shoe-loving"],
	image: "cat-imgs/Liberace.jpg"
},
{
	name: "Angeweena",
	traits: ["half chimpanzee", "middle child", "snoozy", "family-oriented", "lazy"],
	image: "cat-imgs/Angeweena-Joween.jpg"
},
{
	name: "Lunch",
	traits: ["slightly cute", "adorable", "snuggly", "squishable", "vocal"],
	image: "cat-imgs/Lunch.jpg"
},
// Column 2
{
	name: "Cleo",
	traits: ["majestic", "hygenic", "stunning", "slutty", "angelic"],
	image: "cat-imgs/Cleo.jpg"
},
{
	name: "Nacho",
	traits: ["owned by Ashley", "spunky", "sleepy", "adopted", "friendly"],
	image: "cat-imgs/Nacho.jpg"
},
{
	name: "Holla",
	traits: ["ginger", "stripey", "purr-fect", "licky", "jumpy"],
	image: "cat-imgs/Holla.jpg"
},
{
	name: "Liam",
	traits: ["whiny", "petite", "scared to leave the bedroom", "pukey", "pillow-loving"],
	image: "cat-imgs/Liam.jpg"
},
{
	name: "Meatloaf",
	traits: ["loafy", "puffy", "nuzzly", "neck-loving", "perfect"],
	image: "cat-imgs/Meatloaf.jpg"
},
{
	name: "Dinner",
	traits: ["heavy", "ginormous", "slothful", "blemish-free", "drowsy"],
	image: "cat-imgs/Dinner.jpg"
},
// Column 3
{
	name: "Birdie",
	traits: ["flirty", "old ladyish", "scared", "shy", "pudgy"],
	image: "cat-imgs/Birdie.jpg"
},
{
	name: "Nutella",
	traits: ["boss bitch", "playful", "climby", "cute", "fast"],
	image: "cat-imgs/Nutella.jpg"
},
{
	name: "Ween",
	traits: ["fluffy", "scarf-like", "spooky", "stealthy", "bitey"],
	image: "cat-imgs/Ween.jpg"
},
{
	name: "Fartima",
	traits: ["farty", "screamy", "social", "poopful", "tweeny"],
	image: "cat-imgs/Fartima.jpg"
},
{
	name: "Breakfast",
	traits: ["gassy", "ear-loving", "confrontational", "vibrating", "hood-borrowing"],
	image: "cat-imgs/Breakfast.jpg"
}];

// Randomly choose the secret kitten
var k = Math.floor((Math.random() * kittens.length));
var secretKitten = kittens[k].name;
console.log(secretKitten);

// Get user's guess
function getRadioVal(form, name) {
    var guess;
    // get list of radio buttons with specified name
    var radios = form.elements[name];
    
    for (var i=0; i<kittens.length; i++) {
        if (radios[i].checked ) { // radio checked?
            guess = radios[i].value; // if so, hold its value in guess
			document.getElementById(guess).disabled = true;
			var element = document.getElementById(guess + "-label");
    		element.classList.add("disabled-radio");
            break; // and break out of for loop
        }
    }
    return guess; // return value of checked radio or undefined if none checked
}

// Track how many times user guesses
var guessNum = 1;
// Track hints up to 5 to ensure that each hint is given once before repeating
var hintNum = 0;
// Determine how much user loves kittens based on how many guesses it took to guess the secret kitten
var kittyLoveLevel = ["Kitty Psychic", "Kitty Lover", "Kitty Tolerator", "Kitty Idiot", "Kitty Hater"];
var loveLevelNum;
var guessesPerLevel = Math.ceil(kittens.length / 5);
// Stores used values so user doesn't see the same hints twice
var iUsed = [];
var jUsed = [];
// User guesses kittens function
function checkAnswer() {
	var i = Math.floor((Math.random() * 5));
	var j = Math.floor((Math.random() * 5));


	// Get the guess
	var guess = getRadioVal(document.getElementById("guess-form"), "kittyName");
	console.log(guess);

	// Check right or wrong
	var guessedKitten = kittens.findIndex(x => x.name===guess);
	if (guess===secretKitten) {
		// Notify user of correct guess, display image in modal, and highlight secret kitten image on page
		document.getElementById("correct-message").innerHTML = "YOU'RE A GENIUS!!! The secret kitten is " + secretKitten + ".";
		document.getElementById("secret-kitten-img").src = correctImg;
		document.getElementById("guess-modal").style.visibility = "hidden";
		document.getElementById("correct-guess-modal").style.visibility = "visible";
		highlightCorrectKitten();
	}
	else {
		console.log(iUsed, jUsed);
		if (hintNum < 5) {
			if (iUsed.indexOf(i) < 0 && jUsed.indexOf(j) < 0) {
				// Notify user of incorrect guess, randomly choose trait of guessed kitten, and randomly choose secret kitten trait to give as hint.
				document.getElementById("incorrect-message").innerHTML = "WRONG! That kitten is too " + kittens[guessedKitten].traits[i] + ". The kitten I am thinking of is more " + kittens[k].traits[j] + ".";
				document.getElementById("guess-modal").style.visibility = "hidden";
				document.getElementById("incorrect-guess-modal").style.visibility = "visible";
				guessNum++;
				hintNum++;
				iUsed.push(i);
				jUsed.push(j);
				console.log("hintNum = " + hintNum);
			}
			else {
				checkAnswer();
			}
		}
		else {
			iUsed = [];
			jUsed = [];
			hintNum = 0;
			checkAnswer();
		}
	}
// Evenly assign number of guesses to kittyLoveLevel based on how many kittens there are, and assign level to user based on their guessNum
loveLevelNum = Math.floor(guessNum / guessesPerLevel);
}


// Get image of secret kitten
var kittenPic = document.getElementsByTagName("img")[k + 1];
var correctImg = kittenPic.src;
console.log(kittenPic);


// Count the number of guesses the user took before finding the correct kitten
function showStats() {
	document.getElementById("correct-guess-modal").style.visibility = "hidden";
	document.getElementById("stats-modal").style.visibility = "visible";
	if (guessNum > 1) {
		document.getElementById("level-message").innerHTML = "You are a " + kittyLoveLevel[loveLevelNum] + ".";
		document.getElementById("stats-message").innerHTML = "It took you " + guessNum + " tries to guess the secret kitten.";
	}
	else {
		document.getElementById("stats-message").innerHTML = "Congrats! You guessed the secret kitten right away.";
	}
}

// Highlight image of correct kitten
function highlightCorrectKitten() {
	kittenPic.classList.add("correct-kitten");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
	    document.getElementById("modal").style.visibility = "hidden";
    	document.getElementById("username-modal").style.visibility = "hidden";
		document.getElementById("psychopath-test-form").style.visibility = "hidden";
		document.getElementById("not-psychopath-modal").style.visibility = "hidden";
		document.getElementById("is-psychopath-modal").style.visibility = "hidden";
		document.getElementById("guess-modal").style.visibility = "hidden";
		document.getElementById("incorrect-guess-modal").style.visibility = "hidden";
		document.getElementById("correct-guess-modal").style.visibility = "hidden";
	}
}

// Close modal on button click
function closeModal() {
	document.getElementById("modal").style.visibility = "hidden";
	document.getElementById("username-modal").style.visibility = "hidden";
	document.getElementById("psychopath-test-form").style.visibility = "hidden";
	document.getElementById("not-psychopath-modal").style.visibility = "hidden";
	document.getElementById("is-psychopath-modal").style.visibility = "hidden";
	document.getElementById("guess-modal").style.visibility = "hidden";
	document.getElementById("incorrect-guess-modal").style.visibility = "hidden";
	document.getElementById("correct-guess-modal").style.visibility = "hidden";
	document.getElementById("stats-modal").style.visibility = "hidden";
}

// Closes program because user is a psychopath
function quitGame() {
	window.close();
}