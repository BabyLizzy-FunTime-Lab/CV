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

// Image viewer for the gallery
(function imageViewer() {
	let color_whitesmoke = "rgb(245,245,245)"
	let color_blackfade = "rgba(0, 0, 0, 0.9)";
	let color_black = "rgb(0, 0, 0)"

	let imageArray = Array.from(elementClass("gallery-tileimage"));

	imageArray.forEach(function(image) {
		image.addEventListener("click", function(event) {
			let imagesource = this.src;
			let imageText = this.nextElementSibling.innerText;
			
			let viewerContainer = document.createElement("div");
			viewerContainer.id = "imageViewer";
			viewerContainer.style.position = "fixed";
			viewerContainer.style.top = "0";
			viewerContainer.style.zIndex = "2";
			viewerContainer.style.width = "100vw";
			viewerContainer.style.height = "100vh";
			viewerContainer.style.display = "flex";
			viewerContainer.style.alignItems = "center";
			viewerContainer.style.justifyContent = "center";
			viewerContainer.style.backgroundColor = color_blackfade;

			let figure = document.createElement("figure");
			figure.style.height = "90vh";
			figure.style.maxHeight = "60em";
			figure.style.width = "95vw";
			figure.style.maxWidth = "60em"
			figure.style.margin = "0";
			figure.style.backgroundColor = color_black;
			
			let close = document.createElement("div");
			close.setAttribute("style", "width:4em;height:4em;");
			close.style.backgroundImage = "../image/lizzy_art_square.jpg";
			close.style.clipPath = "clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);"
			
			let image = document.createElement("img");
			image.setAttribute("src", imagesource);
			image.setAttribute("style", "width:100%;max-width:40em;height:80%;max-height:40em;margin:auto;");
			
			let caption = document.createElement("figcaption");
			caption.style.color = color_whitesmoke;
			caption.innerText = imageText;

			figure.appendChild(close);
			figure.appendChild(image);
			figure.appendChild(caption);
			viewerContainer.appendChild(figure);
			document.body.insertBefore(viewerContainer, window.document.body.firstChild);
		})
	})
})();