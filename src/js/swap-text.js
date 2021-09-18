// Adds a typing / deleting text effect.
// Author: James Minor

var arrayIndex = 2;  // The index of what tagline to grab from the tagline array.
var textIndex =  0;  // The index of the text cursor.
const taglines = ["Anything", "Anywhere", "Anytime"];

var canErase = false;

function swapText() {
	typeText();
	eraseText();
	setTimeout(swapText, 1750);
}

function typeText() {
	if(textIndex < taglines[arrayIndex].length) {
		if(!canErase) {
			document.getElementById("special-text").innerText += taglines[arrayIndex].charAt(textIndex);
			textIndex++;
			setTimeout(typeText, 80);
		}
	} else {
		canErase = true;
	}
}

function eraseText() {
	if(textIndex > 3) {
		if(canErase) {
			textIndex--;
			var text = document.getElementById("special-text").innerText;
			document.getElementById("special-text").innerText = text.substring(0, textIndex);

			setTimeout(eraseText, 80);
		}
	} else {
		canErase = false;

		// Iterating over taglines array.
		arrayIndex += 1;
		if(arrayIndex >= taglines.length) {
			arrayIndex = 0;
		}
	}
}

swapText();
