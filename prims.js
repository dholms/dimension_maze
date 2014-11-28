var Prims = function(length, height){
	length = length;
	height = height;
	levelSize = length * length;
	totalSize = levelSize * height;
	WallList = [];
	inMaze = [];
	AdjList = [];
	for(var i = 0; i < totalSize; i++){
		AdjList.push([]);
		inMaze.push(0);
	}
	
}

Prims.prototype.construct = function(){
	 for(var i = 0; i < height; i++){
	 	if(i%2 == 0){
	 		this.addFewBlocks(i);
	 	}
	 	else{
	 		this.addManyBlocks(i);
	 	}
	 }
	 this.makePath();
	 return AdjList
}

//adds at most length number of blocks
Prims.prototype.addFewBlocks = function(l){
	blocks = [];
	for(var i = 0; i < length; i++){
		blocks.push(Math.floor(Math.random()*levelSize));
	}

	for(var i = 0; i < blocks.length; i++){
		if(blocks[i] != 20 && blocks[i] != 45 && blocks[i] != 104)
			AdjList[blocks[i] + l*levelSize].push(-1);  //adds to adjList
	}
}

//adds at least levelSize-2*length blocks
Prims.prototype.addManyBlocks = function(l){
	notBlocks = [];
	for(var i = 0; i < 2*length; i++){
		notBlocks.push(Math.floor(Math.random()*levelSize)+ l*levelSize);
	}

	for(var i = l*levelSize; i < (l+1)*levelSize; i++){
		if(notBlocks.indexOf(i) < 0 && i!=45){
			AdjList[i].push(-1);
		}
	}
}

Prims.prototype.makePath = function(){
	inMaze[20] = 1;
	neighbors = this.getNeighbors(20);
	for(var i = 0; i < neighbors.length; i++){
		WallList.push([20, neighbors[i]]);
	}
	while(WallList.length > 0){
		wallNumber = Math.floor(Math.random()*WallList.length);
		wall = WallList[wallNumber];
		cell1 = wall[0];
		cell2 = wall[1];
		//if not in maze, take away wall between two (connect)
		if(inMaze[cell2] == 0){
			inMaze[cell2] = 1;
			AdjList[cell1].push(cell2);
			AdjList[cell2].push(cell1);
			neighbors = this.getNeighbors(cell2);
			for(var i = 0; i < neighbors.length; i++){
				WallList.push([cell2, neighbors[i]]);
			}
		}
		//remove from wall list
		WallList.splice(wallNumber, 1);
	}
}

Prims.prototype.getNeighbors = function(i){
	level = Math.floor(i/levelSize);
	neighbors = [];
	if(i - length >= level && AdjList[i-length][0] != -1)
		neighbors.push(i-length);
	if((i + length)/levelSize < level+1 && AdjList[i+length][0] != -1)
		neighbors.push(i+length);
	if(i%length != 0 && AdjList[i-1][0] != -1)
		neighbors.push(i-1);
	if(i%length != length -1 && AdjList[i+1][0] != -1)
		neighbors.push(i+1);
	if(level > 0 && AdjList[i-levelSize][0] != -1)
		neighbors.push(i-levelSize);
	if(level < height-1 && AdjList[i+levelSize][0] != -1)
		neighbors.push(i+levelSize);

	return neighbors;
}