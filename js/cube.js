var bfs;

var Cube = function(l, h){
	length = l;
	height = h;
	size = length * length;

	//gets loaded images from page
	tiles = document.getElementById("tiles");
	finish = document.getElementById("finish");
	up = document.getElementById("up");
	down = document.getElementById("down");
	updown = document.getElementById("updown");
	
	//uses prims to randomly generate a maze.
	//runs bfs to make sure it is finishable/ if not it generates a new one
	var goodMaze = false;
	while(!goodMaze){
		prims = new Prims(length, height);
		AdjList = prims.construct();
		bfs = new BFS(AdjList);
		goodMaze = bfs.isReachable(0, this.getIndex(length-1, length-1, height-1));
	}
	
	exit = [length-1, length-1, height-1]
}

//prints solution indexes for debugging
Cube.prototype.solution = function(){
	var p = bfs.parents();
	nextNode = this.getTile(length-1, length-1, height-1);
	while(nextNode != 0){
		console.log(p[nextNode]);
		nextNode = p[nextNode];
	}

	return bfs.parents();
}

Cube.prototype.getAdjList = function(){
	return AdjList;
}

Cube.prototype.getNeighbors = function(i){
	return AdjList[i];
}

//draws tile from tiles.png
Cube.prototype.drawTile = function(x, y, t){
	context.drawImage(tiles, t*32, 0, 32, 32, x*32, y*32, 32, 32);
}

//outside borders of graph
Cube.prototype.drawBorders = function(){
	for(var i = 1; i < length + 1; i++){
		this.drawTile(0, i, 2);
		this.drawTile(i, 0, 3);
		this.drawTile(length+1, i, 4)
		this.drawTile(i, length+1, 1);
	}
}

Cube.prototype.drawLevel = function(l){
	for(var i = size*l; i < (l+1)*size; i++){
		tile = this.getSprite(this.getTile(i));
		this.drawTile(this.getCol(i)+1, this.getRow(i)+1, tile);
	}
	if(l == exit[2])
		context.drawImage(finish, 32*(exit[0]+1), 32*(exit[1]+1));
}

Cube.prototype.getIndex = function(x, y, z){
	return z*size + y*length + x;
}

Cube.prototype.getRow = function(t){
	return Math.floor((t%size)/length);
}

Cube.prototype.getCol = function(t){
	return t%length;
}

//t is index of cell in AdjList
//returns type of tile needed. ie "123" or "14"
Cube.prototype.getTile = function(t){
	n = AdjList[t]; //n = neighbors
	if(!n)
		return "1234";

	if(n==-1)
		return "-1";

	left = right = forward = backward = true;
	for(var i = 0; i < n.length; i++){
		if(n[i] == t+1)
			right = false;
		if(n[i] == t-1)
			left = false;
		if(n[i] == t-length)
			forward = false;
		if(n[i] == t+length)
			backward = false;
	}
	result = "";
	if(forward)
		result += "1";
	if(right)
		result += "2";
	if(backward)
		result += "3";
	if(left)
		result += "4";
	return result;
}

//gets location in sprite sheet
//t is the edges the tile should have ie "123" or "14"
Cube.prototype.getSprite = function(t){
	if(t==""){
		t = 0;
	}
	t = parseInt(t);
	if(t == -1)
		return 16;
	if(t < 5){
		return t;
	}
	if(t < 15){
		return t-7;
	}
	if(t < 25){
		return t-15;
	}
	if(t == 34){
		return 10;
	}
	if(t< 125){
		return t-112; 
	}
	if(t == 134){
		return 13;
	}

	if(t == 234){
		return 14;
	}
	if(t == 1234){
		return 15;
	}
}

//checks if the player is able to move from current location
//m is the move where 0-3 are 2d movement and 32 and 44 are between levels
Cube.prototype.canMove = function(x, y, z, m){
	
	index = this.getIndex(x, y, z);
	neighbors = AdjList[index];
	if(!neighbors)
		return false;
	if(m==32){
		if((z+1) <= (height-1) && AdjList[index + size] != -1)
			return true;
		else
			return false;
	}
	if(m==44){
		if((z-1) >= 0 && AdjList[index - size] != -1)
			return true;
		else
			return false;
	}
	var moveIndex;
	if(m == 0)
		moveIndex = index - 1;
	if(m == 1)
		moveIndex = index - length;
	if(m == 2)
		moveIndex = index + 1;
	if(m == 3)
		moveIndex = index + length;
	if(neighbors.indexOf(moveIndex) > -1)
		return true;
	else
		return false;
}

Cube.prototype.win = function(){
	// alert("YOU WIN!");
	location.reload();
}

//displays if you can move up or down a floor
Cube.prototype.levelHints = function(x, y, z){
	var index = this.getIndex(x, y, z);
	if(AdjList[index].indexOf(index+size) > -1 && AdjList[index].indexOf(index-size) > -1)
		context.drawImage(updown, (length)*32, 0);
	else if(AdjList[index].indexOf(index+size) > -1)
		context.drawImage(up, (length)*32, 0);
	else if(AdjList[index].indexOf(index-size) > -1)
		context.drawImage(down, (length)*32, 0);
	else
		context.drawImage(erase, (length)*32, 0);	
}
