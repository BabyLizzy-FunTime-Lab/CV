// Check for internet explorer
if (window.document.documentMode) {
	alert("Please use a modern browser");
}
// global functions
function elementClass(classname) {
	return document.getElementsByClassName(classname);
}


// elementClass("resume-experience-info").addEventListener("click", function(event) {
// 	event.preventDefault();
// 	this.style.backgroundColor = "red";
// })

function showExperience() {
	let classArray = elementClass("resume-experience-info");
	console.log(classArray);

	Array.from(classArray).forEach(function(element) {
		element.addEventListener("click", function(event) {
			this.style.backgroundColor = "red";
		})
	})

}
showExperience();