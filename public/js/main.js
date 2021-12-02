// Check for internet explorer
if (window.document.documentMode) {
	alert("Please use a modern browser");
}
// global variabels
let clickedExperience = false;

// global functions
function elementClass(classname) {
	return document.getElementsByClassName(classname);
}
function elementID(id) {
	return document.getElementById(id);
}

// (function showExperience() {
// 	let classArray = Array.from(elementClass("resume-experience-info"));

// 	classArray.forEach(function(element) {
// 		element.addEventListener("click", function(event) {
// 			classArray.forEach(function(element){
// 				element.style.height = "2.5em";
// 			})
// 			this.style.transition = "all 2s";
// 			this.style.height = "auto";
// 		})
// 	})
// })();

function showExperience() {
	let classArray = Array.from(elementClass("resume-experience-info"));

	classArray.forEach(function(element) {
		element.addEventListener("click", function(event) {



			if (clickedExperience === this.id) {
				clickedExperience = false;
				this.style.height = "2.5em";
			} else if (clickedExperience !== this.className && clickedExperience !== false){
				// oldclicked goes small
				elementID(clickedExperience).style.height = "2.5em";
				// newclicked goes big
				this.style.height = "auto";
				// let is replaced
				clickedExperience = this.id;
			} else {
				// classArray.forEach(function(element){
				// element.style.height = "2.5em";
				// })
				clickedExperience = this.id;
				this.style.height = "auto";
			}
		})
	})
};
