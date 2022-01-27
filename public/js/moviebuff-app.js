// Global variables
let sorry_gif = "https://res.cloudinary.com/babylizzyevee/image/upload/v1643322970/CV-images/sorry_ljryx4.gif";
// Global functions
function elementValue(ID) {
	let value = document.getElementById(ID).value;
	return value;
}
function elementID(naam) {
	return document.getElementById(naam);
}
function elementMaker(tagname, ID_optional, class_optional) {
	let newElement = document.createElement(tagname);
	if (ID_optional) {
		newElement.setAttribute("id", ID_optional);
		return newElement;
	} else if (class_optional) {
		newElement.setAttribute("class", class_optional);
		return newElement;
	} else {
		return newElement;
	}
}
function errorHandeler(error) {
	elementID("error-container").style.display = "grid";
	elementID("error-message").innerText = error;
	elementID("close-err").focus();
}
// Get request functions and URL constructors
function createURL(search_input, string_or_ID) {
	let url;
	let input = search_input.trim();
	switch(string_or_ID) {
		case "string": 
			url = "https://www.omdbapi.com/?apiKey=6c3a2d45&plot=full&type=movie&s=" + input;
			break;
		case "ID": 
			url = "https://www.omdbapi.com/?apiKey=6c3a2d45&plot=full&i=" + input;
			break;
		default:
			errorHandeler("Failed to create URL");
	}
	return url;
}
function top5_URL_array(res) {
	let response_obj = JSON.parse(res);
	switch(response_obj.Response) {
		case "True":
			// GET top 5 movie ID's and make new URL's with movie ID's.
			let array_ID_URL = [];
			let response_length = response_obj.Search.length;
			if ( response_length > 5) {
				for (var i = 0; i < 5; i++) {
					let imdbID_ID = response_obj.Search[i].imdbID;
					let IDsearch_URL = createURL(imdbID_ID, "ID");
					array_ID_URL.push(IDsearch_URL);
				}
			} else {
				for (var i = 0; i < response_length; i++) {
					let imdbID_ID = response_obj.Search[i].imdbID;
					let IDsearch_URL = createURL(imdbID_ID, "ID");
					array_ID_URL.push(IDsearch_URL);
				}
			}
			return array_ID_URL;
			break;
		case "False":
			return response_obj.Error;
			break;
		default:
			errorHandeler("Get request failed.");
	}
}
function getRequest_Promise(url) {
	return new Promise(function(succes, fail) {
		let xhttp;
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		} else {
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		// Get request
		xhttp.open("GET", url, true);
		xhttp.onload = function() {
			if (xhttp.status == 200) {
				let response_obj = JSON.parse(xhttp.responseText);
					switch(response_obj.Response) {
						case "True":
							console.log("getRequest obj worked.");
							succes(xhttp.responseText);
							break;
						case "False":
							errorHandeler(response_obj.Error + " Please try again");
							break;
						default:
							errorHandeler("Request failed. Please try again");
					} 
			} else {
				fail("Server denied query. Error: " + xhttp.status);
			}
		}
		xhttp.send();
	}
)};

// Get Search Results & Render
function search_elements() {
	let poster = elementMaker("img", false, "poster");
	let title = elementMaker("h3", false, "title");
	let year = elementMaker("h4", false, "year");
	let genre = elementMaker("div", false, "genre");
	let type = elementMaker("div", false, "type");
	let director = elementMaker("div", false, "director");
	let actors = elementMaker("div", false, "actors");
	let awards = elementMaker("div", false, "awards");
	let plot = elementMaker("div", false, "plot");
	let info_container = elementMaker("div", false, "info_container_search");

	let search_element_array = new Array(
		poster, title, year, genre, 
		type, director, actors, 
		awards, plot, info_container);
	return search_element_array;
}

function availability_check(movie_data, poster) {
	if (poster) {
		// if poster "N/A" render sorry.gif img.
		if (movie_data === "N/A") {
			// let sorryposter = "../image/sorry.gif";
			return sorry_gif
		} else {
			return movie_data;
		}
	} else if (!poster) {
		// If an info field is N/A show "not available"
		if (movie_data === "N/A") {
			return "Information Not Available";
		} else {
			return movie_data;
		}
	}
}

function render_search(topresults_array) {
	// Create container-objectarrays and element-objectarrays
	let target_container = elementID("searchresults");
	let movie_containers = new Array();
	let movie_elements = new Array();

	for (var i = 0; i < topresults_array.length; i++) {
		let container = elementMaker("section", false, "movie_container");
		movie_containers.push(container);

		let elements = search_elements();
		movie_elements.push(elements);			
	}

	// load elements with data & give alternative if not available.
	topresults_array.forEach( function(object, resultsindex) {
		let moviedata = Object.entries(object);
		moviedata.forEach( function(datafield) {
			function insertdata(targetelement, poster_bool) {
				if (poster_bool) {
					movie_elements[resultsindex][targetelement].src = availability_check(datafield[1], poster_bool);
					if (datafield[1] == "N/A") {
						movie_elements[resultsindex][targetelement].alt = "Poster of " + moviedata[0][1] + " not available.";
					} else {
						movie_elements[resultsindex][targetelement].alt = "Poster of " + moviedata[0][1];
						movie_elements[resultsindex][targetelement].onerror = function(event) {
							this.src = sorry_gif;
							this.alt += " not available";
						};
					}
				} else if(datafield[0] == "Title" || datafield[0] == "Year") { 
					movie_elements[resultsindex][targetelement].innerHTML = datafield[0] + ": " + availability_check(datafield[1], poster_bool);
				} else {
					movie_elements[resultsindex][targetelement].innerHTML = "<h4>" + datafield[0] + ":</h4><p>" + availability_check(datafield[1], poster_bool) + "</p>";
				}
			}
			switch(datafield[0]) {
				case "Title":
					insertdata(1, false);
					break;
				case "Year":
					insertdata(2, false);
					break;
				case "Genre":
					insertdata(3, false);
					break;
				case "Director":
					insertdata(5, false);
					break;
				case "Actors":
					insertdata(6, false);
					break;
				case "Plot":
					insertdata(8, false);
					break;
				case "Awards":
					insertdata(7, false);
					break;
				case "Poster":
					insertdata(0, true);
					break;
				case "Type":
					insertdata(4, false);
					break;
			}
		})

	})
	// Load elements into containers
	movie_elements.forEach( function(elementarray, movie) {
		let movie_info_container = elementarray[9];
		elementarray.forEach( function(element, elementindex) {
			if (elementindex == 0) {
				movie_containers[movie].appendChild(element);
			} else if (elementindex !== 0 && elementindex !== 9) {
				movie_info_container.appendChild(element);
			}
		})
		movie_containers[movie].appendChild(movie_info_container);
	})
	// Render the information
	elementID("searchresults").innerHTML = "<h2>Top Results:</h2>";
	movie_containers.forEach(function(movie_section) {
		target_container.appendChild(movie_section);
	})
}

function run_getRequest(requestURL) {
	getRequest_Promise(requestURL).then(
		function(values) {
			// console.log(values);
			let ID_URLarray = top5_URL_array(values);
			Promise.all(
				// Make get request for every ID URL.
				ID_URLarray.map( function(ID_URL) { 
					return getRequest_Promise(ID_URL);
				})
			).then(
				function(values) {
					// console.log(values);
					let movie_data_array = new Array();

					function parseData(data) {
						let movieData = JSON.parse(data);
						movie_data_array.push(movieData);
					}

					values.forEach(parseData);
					return movie_data_array;
				}
			).then(
				function(values) {
					// ready elements for rendering.
					elementID("banner").style.display = "none";
					elementID("featuredmovies").style.display = "none";
					elementID("searchresults").style.display = "block";
					// Call rendering function
					render_search(values);
				}
			)
		},
		function(err) {
			errorHandeler(err);
		}
	)
}


// Get Featured Movies & Render
function generate_featuredMovies_elements() {	
	let poster = elementMaker("img", false, "poster");
	let title = elementMaker("h3", false, "title");
	let year = elementMaker("h4", false, "year");
	let awards = elementMaker("div", false, "awards");
	let plot = elementMaker("div", false, "plot");
	let info_container = elementMaker("div", false, "info_container_featured");
	
	let element_array = new Array(poster, title, year, awards, plot, info_container);
	return element_array;	 
}
function render_featuredMovies_Data(movie_array) {
	let target_container = elementID("featuredmovies");
	let movie_containers = new Array();
	let movie_elements = new Array();
	
	movie_array.forEach(function(movie, index) {
		movie_containers.push(elementMaker("section", false, "movie_container"));
		movie_elements.push(generate_featuredMovies_elements());
		let info_container = movie_elements[index][5];

		movie_elements[index].forEach( function(element, elementindex) {
			switch(elementindex) {
				case 0:
				// Poster
					element.src = movie.Poster;
					element.alt = "Poster of " + movie.Title;
					movie_containers[index].appendChild(element);
					break;
				case 1:
				// Title
					element.innerHTML = "Title: " + movie.Title;
					info_container.appendChild(element);
					break;
				case 2:
				// Year
					element.innerHTML = "Release year: " + movie.Year;
					info_container.appendChild(element);
					break;
				case 3:
				// Awards
					element.innerHTML = "<h4>Awards:</h4>" + "<p>" + movie.Awards + "</p>";
					info_container.appendChild(element);
					break;
				case 4:
				// Plot
					element.innerHTML = "<h4>Plot:</h4> " + "<p>" + movie.Plot + "</p>";
					info_container.appendChild(element);
					break;
				case 5:
				// Elements into containers
					movie_containers[index].appendChild(info_container);
					target_container.appendChild(movie_containers[index]);
			}
		})
	});
}
function featuredMovies(movie1_ID, movie2_ID) {
	let search_URL_1 = createURL(movie1_ID, "ID");
	let search_URL_2 = createURL(movie2_ID, "ID");
	Promise.all([
		getRequest_Promise(search_URL_1),
		getRequest_Promise(search_URL_2)
	]).then(
		function(values) {
			let movie_1 = JSON.parse(values[0]);
			let movie_2 = JSON.parse(values[1]);
			let movie_array = new Array(movie_1, movie_2);
			return movie_array;
		}
	).then(
		function(movie_array) {
			// Call render function
			render_featuredMovies_Data(movie_array);
		}
	)
}

//Featuredmovies: onload get 2 movies and render info
window.onload = featuredMovies("tt1343727", "tt0103064");
	
// EVENTHANDELING click & enter
elementID("search_btn").addEventListener("click", function() {
	let requestURL = createURL(elementValue("search_input"), "string");
	run_getRequest(requestURL);
}); 
elementID("search_input").addEventListener("keydown", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		let requestURL = createURL(this.value, "string");
		run_getRequest(requestURL);
	}
});
// make the error message go away
elementID("close-err").addEventListener("click", function() {
	elementID("error-container").style.display = "none";
	elementID("search_input").focus();
})