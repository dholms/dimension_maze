var canvas;
var context;
var AdjList = [];

$(document).ready(function(){
	canvas = document.getElementById("c");       		
	context = canvas.getContext("2d");
	
	// cube.drawTile(0, 0, 6);
	// cube.drawTile(1, 1, 5);
	// cube.drawTile(2, 3, 8);
	cube.drawBorders();
	cube.drawLevel(0);
	player.draw();
});

$(document).keydown(function(e) {
    if((e.which>36 && e.which < 41) || e.which == 81 || e.which == 69){
        e.preventDefault();
        direction = e.which -37;
        player.move(direction);
    }            
});

function getTilePos(x, y){
	return [x*32, y*32];
}

var cube = new Cube(5, 3);
var player = new Player(0, 4, 0, context, cube);