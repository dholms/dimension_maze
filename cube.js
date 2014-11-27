var Cube = function(l, h){
	length = l;
	height = h;
	size = length * length;
	// tiles = new Image();
	// tiles.src = "tiles.png";
	tiles = document.getElementById("tiles");
	AdjList = [
	[1],[0,2],[1],[4, 8],[3],
	[6],[5, 7],[6, 8],[3, 7],[-1],
	[11, 15],[10, 16],[-1],[-1],[-1],
	[10, 20],[11, 17, 21],[16],[-1],[24],
	[15],[16],[-1],[-1],[19],
	[30],[-1],[-1],[-1],[-1],
	[25],[-1],[-1],[-1],[-1],
	[-1],[-1],[-1],[-1],[-1],
	[-1],[-1],[47],[44],[43],
	[46],[45],[42],[-1],[-1],
	[51],[50, 52, 56],[51],[54],[53, 59],
	[-1],[51, 57],[56, 58],[57, 63],[54, 64],
	[-1],[-1],[-1],[58, 64, 68],[59, 63],
	[-1],[-1],[-1],[63],[74],
	[-1],[-1],[73],[72,74],[69, 73]
	];
}

Cube.prototype.drawTile = function(x, y, t){
	context.drawImage(tiles, t*32, 0, 32, 32, x*32, y*32, 32, 32);
}

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

//t is index of tile in AdjList
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

//gets lcoation in sprite sheet
//t is the edges the tile should have id "123" or "14"
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