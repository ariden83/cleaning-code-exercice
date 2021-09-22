const direction = ["N", "E", "S", "W"];
const sens = ["F", "B"];
const leftRight = ["L", "R"];

var rover = {
	y: 0,
	x: 0,
	dir: 0,
	moveBlocked: [],
}

var map = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

function initMap(width, height) {
	map = [];
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			map[i][j] = j;
		}
	}
}

function initObstacles(coordinates) {
	coordinates.forEach(function(value){
		if ((map.length < value.x) || (map[value.x].length < value.y))  {
			alert("error");
			return;
		}
		map[value.x][value.y] = 1;
	});
	console.log(map);
}

function start(x, y, dir) {
	rover.x = x;
	rover.y = y;
	rover.dir = direction.indexOf(dir);
}

function setListCommands(commandsRover) {
	if (!Array.isArray(commandsRover) || commandsRover.length <= 0) {
		return
	}
	commandsRover.forEach(function(value) {
		if (leftRight.indexOf(value) !== -1) {
			console.log("pass to set direction");
			setDirection(value);
			
		} else if (sens.indexOf(value) !== -1) {
			console.log("pass to set setPosition");
			setPosition(value);
		
		} else {
			alert("no action found");
		}
	});
	console.log("result", rover);
}


// on nous file droit ou gauche, on récupère la direction courante est on applique le changement
function setDirection(leftOrRight) {
	if (leftOrRight === "R" && rover.dir >= direction.length -1) {	
		rover.dir = 0; 
	} else if (leftOrRight === "R") {
		rover.dir = rover.dir + 1;
		

	} else if (leftOrRight === "L" && rover.dir == 0){
		rover.dir = direction.length -1; 
	} else {
		rover.dir = rover.dir - 1; 
	}
}

function setRealSens(roverSens) {
	if (direction[rover.dir] == "N" || direction[rover.dir] == "W") {
		if (roverSens == "F") {
			roverSens = "B";
		} else {
			roverSens = "F";
		}
	}
	return roverSens;
}

function setRealDir() {
	let toGo = "x"
	if (direction[rover.dir] == "N" || direction[rover.dir] == "S") {
		toGo = "y"
	}
	return toGo;
}


function setPosition(roverSens) {
	let toGo = setRealDir();
	let dirNormal = true;
	
	roverSens = setRealSens(roverSens);

	let roverWouldGo;

	if (roverSens === "F" && rover[toGo] >= map.length -1) {	
		roverWouldGo = 0;
		
	} else if (roverSens === "F") {
		roverWouldGo = rover[toGo] + 1;
		

	} else if (roverSens === "B" && rover[toGo] == 0){
		roverWouldGo = map.length -1; 
		
	} else if (roverSens === "B" ){
		roverWouldGo = rover[toGo] - 1; 
	}
	
	if (!couldGoToMove(toGo, roverWouldGo)) {
		rover.moveBlocked.push(roverSens);
		return;
	}
	rover[toGo] = roverWouldGo
}

function couldGoToMove(directionToGo, roverWouldGo) {
	if (directionToGo == "x" && map[roverWouldGo][rover.y] !== 0) {
		console.log("move blocked " + directionToGo +" "+roverWouldGo + " :: "+ map[roverWouldGo][rover.y]);
	} else if (directionToGo == "y" && map[rover.y][roverWouldGo] !== 0) {
		console.log("move blocked " + directionToGo +" "+roverWouldGo+ " :: "+ map[rover.y][roverWouldGo]);
	} else {
		return true;
	}
	return false;
}

/////////////////////////////////// tdd //

function launchTests() {
start(0,0,"N");

if (rover.x != 0) {
	alert("fail on start X");
}
if (rover.y != 0) {
	alert("fail on start y");
}
if (direction[rover.dir] != "N") {
	alert("fail on start: direction");
}

console.log("start func ok");

setListCommands(["L"]);
if (direction[rover.dir] != "W") {
	alert("fail on setListCommands: L, want W have :"+ direction[rover.dir]);
}

setListCommands(["L"]);
if (direction[rover.dir] != "S") {
	alert("fail on setListCommands: L, want S have :"+ direction[rover.dir]);
}

setListCommands(["R"]);
if (direction[rover.dir] != "W") {
	alert("fail on setListCommands: R, want W have :"+ direction[rover.dir]);
}

setListCommands(["R"]);
if (direction[rover.dir] != "N") {
	alert("fail on setListCommands: R, want N have :"+ direction[rover.dir]);
}

console.log("direction func ok");


setListCommands(["F"]);
if (rover.y != map.length -1) {
	alert("fail on setListCommands: F, want "+ (map.length - 1 )+" have :"+ rover.y );
}
if (rover.x != 0) {
	alert("fail on X not must move");
}

setListCommands(["F"]);
if (rover.y != map.length -2) {
	alert("fail on setListCommands: F, want "+ (map.length - 2)+" have :"+ rover.y );
}
if (rover.x != 0) {
	alert("fail on X not must move");
}

setListCommands(["B"]);
if (rover.y != map.length -1) {
	alert("fail on setListCommands: B, want "+ (map.length - 2 )+" have :"+ rover.y );
}
if (rover.x != 0) {
	alert("fail on X not must move");
}

setListCommands(["B"]);
if (rover.y !== 0) {
	alert("fail on setListCommands: B, want 0 have :"+ rover.y );
}
if (rover.x != 0) {
	alert("fail on X not must move");
}

console.log("test normal direction");

setListCommands(["R"]);
if (direction[rover.dir] != "E") {
	alert("fail on setListCommands: R, want E have :"+ direction[rover.dir]);
}

setListCommands(["F"]);
if (rover.x != 1) {
	alert("fail on setListCommands: F, want 1 have :"+ rover.x );
}
if (rover.y != 0) {
	alert("fail on y not must move");
}

console.log("test multi direction");
setListCommands(["F", "F"]);
if (rover.x != 3) {
	alert("fail on setListCommands: F, want 3 have :"+ rover.x );
}
if (rover.y != 0) {
	alert("fail on y not must move");
}

console.log("test multi direction");
setListCommands(["F", "F","R","F"]);
if (rover.x != 0) {
	alert("fail on setListCommands: F, F,R,F, want 0 for x have :"+ rover.x );
}
if (rover.y != 1) {
	alert("fail on setListCommands : F, F,R,F, want 1 for y have :"+ rover.y );
}

initObstacles([{"x": 0, "y": 2}, {"x":2,"y":0}, {"x":3,"y":2}]);
var mapTest = [[0,0,1,0,0], [0,0,0,0,0], [1,0,0,0,0], [0,0,1,0,0], [0,0,0,0,0]];
if (map.toString() != mapTest.toString()) {
	alert("Errors on obstacles generation, have" + mapTest.toString());
}
}

launchTests();
