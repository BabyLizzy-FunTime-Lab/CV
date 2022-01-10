// Check for internet explorer
if (window.document.documentMode) {
	alert("Please use a modern browser");
}
// global variabels
let clickedExperienceID = false;

// global functions
function elementClass(classname) {
	return document.getElementsByClassName(classname);
}
function elementID(id) {
	return document.getElementById(id);
}

//Experience section text reveal function
(function showExperience() {
	let classArray = Array.from(elementClass("showmore-btn"));

	classArray.forEach(function(element) {
		element.addEventListener("click", function(event) {
			let thisElement = this;
			if (clickedExperienceID === false) {
				clickedExperienceID = this.parentElement.id;
				this.nextElementSibling.style.display = "initial";
				this.style.display = "none";
				window.setTimeout(function() {
					thisElement.nextElementSibling.className = "resume-experience-story-show";
				}, 50)
			} else {
				elementID(clickedExperienceID).children[2].style.display = "initial";
				elementID(clickedExperienceID).children[3].style.display = "none";
				elementID(clickedExperienceID).children[3].className = "resume-experience-story";
				this.nextElementSibling.style.display = "initial";
				this.style.display = "none";
				window.setTimeout(function() {
					thisElement.nextElementSibling.className = "resume-experience-story-show";
				}, 50)
				clickedExperienceID = this.parentElement.id;
			}
		})
	})
})();

