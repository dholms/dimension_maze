var canvas;
var context;
var length= 10;
var height = 3;
var AdjList = [];
var mc;

$(document).ready(function(){
	canvas = document.getElementById("c");  
	// canvas.width = window.innerWidth;
	// canvas.height = window.innerHeight;     		
	context = canvas.getContext("2d");
	cube.drawBorders();
	cube.drawLevel(0);
	player.draw();

	// body = document.getElementById("main");
	// mc = new Hammer.Manager(body);
	// var swipe = new Hammer.Swipe({threshold: 2});
	// var pinch = new Hammer.Pinch();
	// mc.add(swipe);
	// mc.add(pinch);
	// mc.on("swipeleft", function(ev){player.move(0);})
	// mc.on("swipeup", function(ev){player.move(1);})
	// mc.on("swiperight", function(ev){player.move(2);})
	// mc.on("swipedown", function(ev){player.move(3);})
	// var pinchTimer;
	// mc.on("pinchin", function(ev){
	// 	clearTimeout(pinchTimer);
	// 		pinchTimer  = setTimeout(function(){
	// 		player.move(44);
	// 	}, 50);
	// })
	// mc.on("pinchout", function(ev){
	// 	clearTimeout(pinchTimer);
	// 		pinchTimer  = setTimeout(function(){
	// 		player.move(32);
	// 	}, 50);
	// })
});

// window.addEventListener('load', resize, false);

// function resize() {
// 	var w = window.innerWidth;
// 	var ratio = canvas.height/canvas.width;
// 	var h = w * ratio;
// 	canvas.style.width = w+'px';
// 	canvas.style.height = h+'px';
// }


$(document).keydown(function(e) {
    if((e.which>36 && e.which < 41) || e.which == 81 || e.which == 69){
        e.preventDefault();
        direction = e.which -37;
        player.move(direction);
    }            
});

var cube = new Cube(length, height);
var player = new Player(0, 0, 0, context, cube);