// Global functions
function elementID(ID) {
	return document.getElementById(ID);
}
// // Colors and backgrounds
// let color_whitesmoke = "rgb(245,245,245)";
// let color_blackfade = "rgba(0, 0, 0, 0.9)";
// let color_black = "rgb(0, 0, 0)";
// let close_background = "url(https://res.cloudinary.com/babylizzyevee/image/upload/c_limit,h_400,q_100,x_1406,y_1225/v1643152743/CV-images/lizzy_art_square_sclfqn.jpg)";
// let close_Xshape = "polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)";
// // Create Game container
// let game_background = document.createElement("div");
// game_background.id = "game--background";
// game_background.style.position = "fixed";
// game_background.style.top = "0";
// game_background.style.zIndex = "2";
// game_background.style.width = "100vw";
// game_background.style.height = "100vh";
// game_background.style.display = "flex";
// game_background.style.alignItems = "center";
// game_background.style.justifyContent = "center";
// game_background.style.backgroundColor = color_blackfade;

// let close_btn = document.createElement("div");
// close_btn.setAttribute("style", "width:2em;height:2em;margin: .5em auto .5em auto;");
// close_btn.style.backgroundImage = close_background;
// close_btn.style.backgroundColor = color_whitesmoke;
// close_btn.style.clipPath = close_Xshape;
// close_btn.style.backgroundPosition = "center";
// close_btn.style.backgroundSize = "cover";
// close_btn.addEventListener("click", function(event) {
// 	elementID("game--background").remove();
// })

// let game_controls = document.createElement("div");
// game_controls.style.color = color_whitesmoke;
// game_controls.style.textAlign = "center";
// game_controls.style.margin = ".4em 0 .4em 0";
// game_controls.innerText = "To Jump press 'j' or tap screen";

// let game_container = document.createElement("div");
// game_container.id = "game--container";
// game_container.style.margin = "auto";

// let start_btn = document.createElement("button");
// start_btn.id = "start_btn";

// function ninjaGame() {
// 	game_background.appendChild(close_btn);
// 	game_background.appendChild(game_controls);
// 	game_background.appendChild(game_container);
// 	game_background.appendChild(start_btn);
// }

// Sprites, Game Backgrounds & Images
let ninja_sprite = new Image();
	ninja_sprite.src = "images/nanonauten/geanimeerdeNanonaut.png";
let robot_bad_sprite = new Image();
	robot_bad_sprite.src = "images/nanonauten/geanimeerdeRobot.png";
let achtergrondAfbeelding = new Image();
	achtergrondAfbeelding.src = "images/nanonauten/achtergrond.png";
let bosje_1_Afbeelding = new Image();
	bosje_1_Afbeelding.src = "images/nanonauten/bosje1.png";
let bosje_2_Afbeelding = new Image();
	bosje_2_Afbeelding.src = "images/nanonauten/bosje2.png";

// CONSTANTEN
let SPEEL_SPELMODUS = 0;
let GAME_OVER_SPELMODUS = 1;
let CANVAS_BREEDTE = 800;
let CANVAS_HOOGTE = 600;
let GROND_Y = 540;
let ACHTERGROND_BREEDTE = 1000;
let JUMP_CODE = "KeyJ";
let SCHERMSCHUD_RADIUS = 16;
let NANONAUT_BREEDTE = 181;
let NANONAUT_HOOGTE = 229;
let NANONAUT_Y_VERSNELLING = 1;
let NANONAUT_SPRONG_SNELHEID = -20;
let NANONAUT_X_SNELHEID = 5;
let NANONAUT_NR_ANIMATIEFRAMES = 7;
let NANONAUT_ANIMATIESNELHEID = 3;
let NANONAUT_MAX_GEZONDHEID = 100;
let ROBOT_BREEDTE = 141;
let ROBOT_HOOGTE = 139;
let ROBOT_ANIMATIESNELHEID = 5;
let ROBOT_NR_ANIMATIEFRAMES = 9;
let ROBOT_X_SNELHEID = 5;
let MIN_AFSTAND_TUSSEN_ROBOTS = 400;
let MAX_AFSTAND_TUSSEN_ROBOTS = 1200;
let MAX_ACTIEVE_ROBOTS = 3;

// INSTELLINGEN
let spelModus = SPEEL_SPELMODUS;
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = CANVAS_BREEDTE;
canvas.height = CANVAS_HOOGTE;
canvas.id = "game__canvas";
elementID("game--container").appendChild(canvas);
let jump = false;
let cameraX = 0;
let cameraY = 0;
let spelFrameTeller = 0;
let bosjesData = genereerBosjes();
let schermschudden = false;
let nanonautGezondheid = NANONAUT_MAX_GEZONDHEID;
let nanonautX = 70;
let nanonautY = GROND_Y - NANONAUT_HOOGTE;
let nanonautYSnelheid = 0;
let nanonautIsInDeLucht = false;
let nanonautFrameNr = 0;
let nannonautSpriteSheet = {
	nrFramesPerRij: 5,
	spriteWidth: NANONAUT_BREEDTE,
	spriteHeight: NANONAUT_HOOGTE,
	image: ninja_sprite
};
let robotSpriteSheet = {
	nrFramesPerRij: 3,
	spriteWidth: ROBOT_BREEDTE,
	spriteHeight: ROBOT_HOOGTE,
	image: robot_bad_sprite
}
let robotData = [];

// Hit box
let nanonaut_Hitbox = {
	x_Offset: 60,
	y_Offset: 20,
	breedte: 50,
	hoogte: 200
};
let robot_Hitbox = {
	x_Offset: 50,
	y_Offset: 20,
	breedte: 50,
	hoogte: 100
};

// Create bosjes, with coordinates, to be drawn.
function genereerBosjes() {
	let genereerBosjesData = [];
	let bosjeX = 0;
	let bosjeAfbeelding;
	while (bosjeX < (2 * CANVAS_BREEDTE)) {
		if (Math.random() >= 0.5) {
			bosjeAfbeelding = bosje_1_Afbeelding;
		} else {
			bosjeAfbeelding = bosje_2_Afbeelding;
		}
		genereerBosjesData.push({
			x: bosjeX,
			y: 80 + (Math.random() * 20),
			image: bosjeAfbeelding
		});
		bosjeX += 150 + (Math.random() * 200);
	}
	return genereerBosjesData;
}

// Draw running sprite animation function.
function tekenGeanimeerdeSprite(schermX, schermY, frameNR, spriteSheet) {
	let spriteSheetRij = Math.floor(frameNR/spriteSheet.nrFramesPerRij);
	let spriteSheetKolom = frameNR % spriteSheet.nrFramesPerRij;
	let spriteSheetX = spriteSheetKolom * spriteSheet.spriteWidth;
	let spriteSheetY = spriteSheetRij * spriteSheet.spriteHeight;
	ctx.drawImage(
		spriteSheet.image, 
		spriteSheetX, 
		spriteSheetY,
		spriteSheet.spriteWidth,
		spriteSheet.spriteHeight,
		schermX, schermY,
		spriteSheet.spriteWidth,
		spriteSheet.spriteHeight
	)
}
// Afstand Score
function afstandScore(totaalPixels) {
	let score = nanonautX / 100;
	ctx.fillStyle = "black";
	ctx.font = "48px sans-serif";
	ctx.fillText(score.toFixed(0) + "m", 20, 40); 
}
// Hit detection functions
function damageCalc(enemy) {
	if (nanonautGezondheid > 0) {
		switch (enemy) {
			case "robot":
				nanonautGezondheid -= 1;
				console.log("Life count: " + nanonautGezondheid);
				break;
			default:
				console.log("Unknown enemy");
		}
	} else {
		console.log("GAME OVER");
		schermschudden = false;
		spelModus = GAME_OVER_SPELMODUS;
	}	
}
function lifebar(lifecount) {
	ctx.fillStyle = "white";
	ctx.fillRect(400, 10, 380, 20);
    ctx.fillStyle = "red";
    ctx.fillRect(400, 10, lifecount / NANONAUT_MAX_GEZONDHEID * 380, 20);
    ctx.strokeStyle = "black";
    ctx.strokeRect(400, 10, 380, 20);
}
function overlappenNanonautEnRobotOpEenAs(nanonautDichtbijX, nanonautVerX, robotDichtbijX, robotVerX) {
	let nanonautOverlaptRandRobotDichtbij = 
		(nanonautVerX >= robotDichtbijX) && 
		(nanonautVerX <= robotVerX);
	let nanonautOverlaptRandRobotVer = 
		(nanonautDichtbijX >= robotDichtbijX) && 
		(nanonautDichtbijX <= robotVerX);
	let nanonautOverlaptRobotHelemaal = 
		(nanonautDichtbijX <= robotDichtbijX) && 
		(nanonautVerX >= robotVerX);
	return nanonautOverlaptRandRobotDichtbij || nanonautOverlaptRandRobotVer || nanonautOverlaptRobotHelemaal;
}
function overlappenNanonautRobot(nanonautX, nanonautY, nanonautBreedte, nanonautHoogte,
	robotX, robotY, robotBreedte, robotHoogte) {
	let nanonautOverlaptRobotOp_X_As = overlappenNanonautEnRobotOpEenAs(
		nanonautX, 
		nanonautX + nanonautBreedte,
		robotX,
		robotX + robotBreedte
	);
	let nanonautOverlaptRobotOp_Y_As = overlappenNanonautEnRobotOpEenAs(
		nanonautY,
		nanonautY + nanonautHoogte,
		robotY,
		robotY + robotHoogte
	);
	return nanonautOverlaptRobotOp_X_As && nanonautOverlaptRobotOp_Y_As;
}

// Verplaats en animeer robots
function updateRobots() {
	for (var i = 0; i < robotData.length; i++) {
		// Check for hit
		let hit_Check = overlappenNanonautRobot(
			nanonautX + nanonaut_Hitbox.x_Offset,
			nanonautY + nanonaut_Hitbox.y_Offset,
			nanonaut_Hitbox.breedte,
			nanonaut_Hitbox.hoogte,
			robotData[i].x + robot_Hitbox.x_Offset,
			robotData[i].y + robot_Hitbox.y_Offset,
			robot_Hitbox.breedte,
			robot_Hitbox.hoogte
		);
		if (hit_Check) {
			console.log("Hit!!" + hit_Check);
			schermschudden = true;
			damageCalc("robot");
		}
		// Robots run left
		robotData[i].x -= ROBOT_X_SNELHEID;
		if ((spelFrameTeller % ROBOT_ANIMATIESNELHEID) === 0) {
			robotData[i].frameNR++;
			if (robotData[i].frameNR >= ROBOT_NR_ANIMATIEFRAMES) {
				robotData[i].frameNR = 0;
			}
		}
		// Verwijder robots die uit beeld zijn, uit de robotData array.
		let robotIndex = 0;
		while (robotIndex < robotData.length) {
			if (robotData[robotIndex].x < cameraX - ROBOT_BREEDTE) {
				robotData.splice(robotIndex, 1);
				console.log("Robot gone " + robotIndex);
			} else {
				robotIndex++;
				// console.log("Robot in screen " + robotIndex);
			}
		}
	}
	// Generate new robot within the robotData array.
	if (robotData.length < MAX_ACTIEVE_ROBOTS) {
		let laatsteRobotX = CANVAS_BREEDTE;
		if (robotData.length > 0) {
			laatsteRobotX = robotData[robotData.length -1].x;
		}
		let nieuweRobotX = laatsteRobotX + MIN_AFSTAND_TUSSEN_ROBOTS + 
			Math.random() * (MAX_AFSTAND_TUSSEN_ROBOTS - MIN_AFSTAND_TUSSEN_ROBOTS);
		robotData.push({
			x: nieuweRobotX,
			y: GROND_Y - ROBOT_HOOGTE,
			frameNR: 0
		}); 
	}
}

// UPDATEN
function update() {
	// Game mode
	if (spelModus != SPEEL_SPELMODUS) {return};
	// Framecounter
	spelFrameTeller++;
	// Run
	nanonautX = nanonautX + NANONAUT_X_SNELHEID;
	// Jump
	if (jump && !nanonautIsInDeLucht) {
        nanonautYSnelheid = NANONAUT_SPRONG_SNELHEID;
        nanonautIsInDeLucht = true;
	}
	// Gravity
    nanonautY = nanonautY + nanonautYSnelheid;
    nanonautYSnelheid = nanonautYSnelheid + NANONAUT_Y_VERSNELLING;
    // Bottom
    if (nanonautY > (GROND_Y - NANONAUT_HOOGTE)) {
        nanonautY = GROND_Y - NANONAUT_HOOGTE;
        nanonautYSnelheid = 0;
        nanonautIsInDeLucht = false;
    }
    // Update animatie na 3 frames
    if ((spelFrameTeller % NANONAUT_ANIMATIESNELHEID) === 0) {
    	nanonautFrameNr++;
    	if (nanonautFrameNr >= NANONAUT_NR_ANIMATIEFRAMES) {
    		nanonautFrameNr = 0;
    	}
    }
    // Update bosjes, resets coordinates if bosje moves offscreen.
    for (var i = 0; i < bosjesData.length; i++) {
    	if ((bosjesData[i].x - cameraX) < - CANVAS_BREEDTE) {
    		bosjesData[i].x += (2 * CANVAS_BREEDTE) + 150;
    	} 
    }
    // Update robots, check robot hit.
    schermschudden = false;
    updateRobots();
    // Update camera
    cameraX = nanonautX - 70;
}

//TEKENEN
function draw() {	
	// Camera shake, on hit.
    let schuddendeCameraX = cameraX;
    let schuddendeCameraY = cameraY;
    if (schermschudden) {
    	schuddendeCameraX += (Math.random() - .5) * SCHERMSCHUD_RADIUS;
    	schuddendeCameraY += (Math.random() - .5) * SCHERMSCHUD_RADIUS;
    }
	// Teken de lucht
	ctx.fillStyle = "LightSkyBlue";
	ctx.fillRect(0, 0, CANVAS_BREEDTE, GROND_Y - 40);

	// Teken de bewegend achtergrond
	// achtergrondX is negative so it scrolls to the left and not to the right.
	let achtergrondX = -(schuddendeCameraX % ACHTERGROND_BREEDTE);
	ctx.drawImage(achtergrondAfbeelding, achtergrondX, -210);
	ctx.drawImage(achtergrondAfbeelding, achtergrondX + ACHTERGROND_BREEDTE, -210);
	// Modus doesn't allow achtergrondX to go beonde 1000 and loops back to 0. The second draw glues
	// a new background to the end of the first one.

	// Teken de grond
	ctx.fillStyle = "ForestGreen";
	ctx.fillRect(0, GROND_Y - 40, CANVAS_BREEDTE, CANVAS_HOOGTE - GROND_Y + 40);

	// Teken bosjes, generated by genereerBosjes()
	for (var i = 0; i < bosjesData.length; i++) {
		ctx.drawImage(bosjesData[i].image, 
			bosjesData[i].x - schuddendeCameraX, 
			GROND_Y - bosjesData[i].y - schuddendeCameraY); 
	}

	// Teken robots
	for (var i = 0; i < robotData.length; i++) {
		tekenGeanimeerdeSprite(robotData[i].x - schuddendeCameraX, robotData[i].y - schuddendeCameraY, 
			robotData[i].frameNR, robotSpriteSheet);
	}

	// Teken een geanimeerde ninja sprite
    tekenGeanimeerdeSprite(nanonautX - schuddendeCameraX, nanonautY - schuddendeCameraY, 
    	nanonautFrameNr, nannonautSpriteSheet);
    // Teken afstand
    afstandScore(nanonautX);
	// Teken Lifebar
	lifebar(nanonautGezondheid);
	// Game Over screen
	if (spelModus == GAME_OVER_SPELMODUS) {
		ctx.fillStyle = "black";
		ctx.font = "100px sans-serif";
		ctx.fillText("Game Over", 150, 300);
	}
}

// SPELER-HANDELINGEN, controls
document.body.onkeydown = function(event) {
	if (event.code === JUMP_CODE) {
		jump = true;
	}
}
document.body.onkeyup = function(event) {
	if (event.code === JUMP_CODE) {
		jump = false;
	}
}
document.body.ontouchstart = function(event) {
	jump = true;
} 
document.body.ontouchend = function(event) {
	jump = false;
}
// HOOFD-LUS
function hoofdLus() {
	update();
	draw();
	window.requestAnimationFrame(hoofdLus);
}
// Start Game
function start() {
	window.requestAnimationFrame(hoofdLus);
}
// Eventhandeler start game
elementID("start_btn").addEventListener("click", function(event) {
	event.preventDefault();
	start();
})

// Teken de Nanonaut in viewport, old ninja animation
	// ctx.drawImage(ninja_sprite, nanonautX - cameraX, nanonautY - cameraY);
	// let nanonautSpriteSheetRij = Math.floor(nanonautFrameNr/NANONAUT_NR_FRAMES_PER_RIJ);
	// let nannonautSpriteSheetKolom = nanonautFrameNr % NANONAUT_NR_FRAMES_PER_RIJ;
	// let nannonautSpriteSheetX = nannonautSpriteSheetKolom * NANONAUT_BREEDTE;
	// let nannonautSpriteSheetY = nanonautSpriteSheetRij * NANONAUT_HOOGTE;
	// ctx.drawImage(ninja_sprite, nannonautSpriteSheetX, nannonautSpriteSheetY, 
	// 	NANONAUT_BREEDTE, NANONAUT_HOOGTE, nanonautX - cameraX, nanonautY - cameraY, 
	// 	NANONAUT_BREEDTE, NANONAUT_HOOGTE);

// // Global variable, CONSTANTEN
// let canvas = document.createElement("canvas");
// let ctx = canvas.getContext("2d");
// let ninja_sprite = new Image();
// 	ninja_sprite.src = "Images/nanonauten/nanonaut.png";

// let x = 20;
// let y = 40;

// // Global functions
// function elementID(ID) {
// 	return document.getElementById(ID);
// }

// // Global settings, INSTELLINGEN
// ctx.imageSmoothingEnabled = false;

// // Render Game Character
// function render_squareMan() {
// 	ctx.fillStyle = "green";
// 	ctx.fillRect(10,10, 30, 20);
// }
// function render_ninja() {
// 	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
// 	// If the image object is created in the function
// 	// it needs the onload method.
// 	// ninja_sprite.onload = function() {
// 	// 	ctx.drawImage(ninja_sprite, 20, 40, 50, 40);
// 	// }	
// }

// let direction = "forward";
// function ninja_loop() {
// 	ctx.clearRect(0, 0, 800, 600);

// 	if (direction === "forward") {
// 		ctx.drawImage(ninja_sprite, x, y, 50, 40);
// 		x++;
// 		window.requestAnimationFrame(ninja_loop);
// 		// console.log("This is x, " + x);
// 		if (x == 200) {
// 			direction = "backwards";
// 		}
// 	} else if (direction === "backwards") {
// 		ctx.drawImage(ninja_sprite, x, y, 50, 40);
// 		x--;
// 		window.requestAnimationFrame(ninja_loop);
// 		// console.log("This is x, " + x);
// 		if (x == 20) {
// 			direction = "forward";
// 		} 
// 	}
// }

// // Create game world
// function start_screen() {
// 	window.requestAnimationFrame(ninja_loop);
// 	canvas.id = "game__canvas";
// 	render_squareMan();
// 	render_ninja();
// 	elementID("game--container").appendChild(canvas);
// }


// // Start Game
// elementID("start_btn").addEventListener("click", function(event) {
// 	event.preventDefault();
// 	start_screen();
// }) 