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

//Experience & education sections text reveal function
(function showStory() {
	let classArray = Array.from(elementClass("showmore-btn"));

	classArray.forEach(function(element) {
		element.addEventListener("click", function(event) {
			let thisElement = this;
			if (clickedExperienceID === false) {
				clickedExperienceID = this.parentElement.id;
				this.nextElementSibling.style.display = "initial";
				this.style.display = "none";
				window.setTimeout(function() {
					thisElement.nextElementSibling.className = "resume-story-show";
				}, 50)
			} else {
				elementID(clickedExperienceID).children[3].style.display = "initial";
				elementID(clickedExperienceID).children[4].style.display = "none";
				elementID(clickedExperienceID).children[4].className = "resume-story";
				this.nextElementSibling.style.display = "initial";
				this.style.display = "none";
				window.setTimeout(function() {
					thisElement.nextElementSibling.className = "resume-story-show";
				}, 50)
				clickedExperienceID = this.parentElement.id;
			}
		})
	})
})();

// Image viewer for the gallery
(function imageViewer() {
	let color_whitesmoke = "rgb(245,245,245)";
	let color_blackfade = "rgba(0, 0, 0, 0.9)";
	let color_black = "rgb(0, 0, 0)";
	let close_background = "url(https://res.cloudinary.com/babylizzyevee/image/upload/c_limit,h_400,q_100,x_1406,y_1225/v1643152743/CV-images/lizzy_art_square_sclfqn.jpg)";
	let close_Xshape = "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)";
	let next_shape = "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)";
	let previous_shape = "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)";
	let current_image;

	let imageArray = Array.from(elementClass("gallery-tileimage"));

	imageArray.forEach(function(image, index) {
		let current_image = index;

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
			figure.style.display = "flex";
			figure.style.flexDirection = "column";
			figure.style.margin = "0";
			figure.style.padding = "0 0.2em 0 0.2em";
			figure.style.backgroundColor = color_black;
			
			let close = document.createElement("div");
			close.setAttribute("style", "width:2em;height:2em;margin: .5em auto .5em auto;");
			close.style.backgroundImage = close_background;
			close.style.backgroundColor = color_whitesmoke;
			close.style.clipPath = close_Xshape;
			close.style.backgroundPosition = "center";
			close.style.backgroundSize = "cover";
			close.addEventListener("click", function(event) {
				elementID("imageViewer").remove();
			})

			let next = document.createElement("div");
			next.setAttribute("style", "width:2em;height:2em;margin: .5em auto .5em auto;");
			next.style.backgroundImage = close_background;
			next.style.backgroundColor = color_whitesmoke;
			next.style.clipPath = next_shape;
			next.style.backgroundPosition = "center";
			next.style.backgroundSize = "cover";
			next.addEventListener("click", function(event) {
				if (imageArray[current_image + 1]) {
					imagesource = imageArray[current_image + 1].src;
					imageText = imageArray[current_image + 1].nextElementSibling.innerText;
					current_image++;
					elementID("viewerImage").setAttribute("src", imagesource);
					elementID("viewerCaption").innerText = imageText;
				} else {
					return
				}
			})

			let previous = document.createElement("div");
			previous.setAttribute("style", "width:2em;height:2em;margin: .5em auto .5em auto;");
			previous.style.backgroundImage = close_background;
			previous.style.backgroundColor = color_whitesmoke;
			previous.style.clipPath = previous_shape;
			previous.style.backgroundPosition = "center";
			previous.style.backgroundSize = "cover";
			previous.addEventListener("click", function(event) {
				if (imageArray[current_image - 1]) {
					imagesource = imageArray[current_image - 1].src;
					imageText = imageArray[current_image - 1].nextElementSibling.innerText;
					current_image--;
					elementID("viewerImage").setAttribute("src", imagesource);
					elementID("viewerCaption").innerText = imageText;
				} else {
					return
				}
			})

			let controls_container = document.createElement("div");
			controls_container.setAttribute("style", "display:flex;justify-content:space-around;");
			controls_container.append(previous, close, next);


			let image = document.createElement("img");
			image.setAttribute("src", imagesource);
			image.setAttribute("id", "viewerImage");
			function landscapeMobile(size) {
				if(size.matches) {
					image.setAttribute("style", "width:100%;height:100%;max-height:15em;object-position:center;object-fit:contain;");
				} else {
					image.setAttribute("style", "width:100%;height:100%;max-height:40em;object-position:center;object-fit:contain;");
				}
			}
			let landscape_Size = window.matchMedia("(max-height: 600px)"); 
			landscapeMobile(landscape_Size);
			landscape_Size.addListener(landscapeMobile);
			
			let caption = document.createElement("figcaption");
			caption.setAttribute("id", "viewerCaption");
			caption.style.color = color_whitesmoke;
			caption.style.textAlign = "center";
			caption.style.margin = ".4em 0 .4em 0";
			caption.innerText = imageText;

			figure.appendChild(controls_container);
			figure.appendChild(image);
			figure.appendChild(caption);
			viewerContainer.appendChild(figure);
			document.body.insertBefore(viewerContainer, window.document.body.firstChild);
		})
	})
})();