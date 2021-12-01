// Check for internet explorer
if (window.document.documentMode) {
	alert("Please use a modern browser");
}
// global functions
function elementClass(classname) {
	return document.getElementsByClassName(classname);
}

(function showExperience() {
	let classArray = Array.from(elementClass("resume-experience-info"));

	classArray.forEach(function(element) {
		element.addEventListener("click", function(event) {
			classArray.forEach(function(element){
				element.style.height = "2.5em";
			})
			this.style.height = "auto";
		})
	})
})();
