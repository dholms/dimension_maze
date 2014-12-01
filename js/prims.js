var Prims = function(length, height){
	length = length;
	height = height;
	levelSize = length * length;
	totalSize = levelSize * height;
	inMaze = [];
	AdjList = [];
	AdjList.length = 0;

	//fills AdjList with empty arrays (no neighbors)
	//fills inMaze with 0s so that nothing is in the maze
	for(var i = 0; i < totalSize; i++){
		AdjList.push([]);
		inMaze.push(0);
	}
	
}

//add impassable blocks to each level then run randomized Prim's algorithm
Prims.prototype.construct = function(){
	 for(var i = 0; i < height; i++){
	 	// if(i%2 == 0){
	 	// 	// this.addFewBlocks(i);
	 	// }
	 	// else{
	 	// 	// this.addManyBlocks(i);
	 	// }
	 	this.addBlocks(i);
	 }
	 this.makePath();
	 return AdjList
}

//adds at most half the level size in blocks. Usually closer to a third or less
Prims.prototype.addBlocks = function(l){
	blocks = [];
	for(var i = 0; i < levelSize/2; i++){
		blocks.push(Math.floor(Math.random()*levelSize));
	}

	for(var i = 0; i < blocks.length; i++){
		index = blocks[i] + l*levelSize
		if(index != 0 && index != 64 && index != 191)
			AdjList[index] = [-1];  //adds to adjList
	}
}

// //adds at most length number of blocks
// Prims.prototype.addFewBlocks = function(l){
// 	blocks = [];
// 	for(var i = 0; i < length; i++){
// 		blocks.push(Math.floor(Math.random()*levelSize));
// 	}

// 	for(var i = 0; i < blocks.length; i++){
// 		if(blocks[i] != 20 && blocks[i] != 45 && blocks[i] != 104)
// 			AdjList[blocks[i] + l*levelSize].push(-1);  //adds to adjList
// 	}
// }

// //adds at least levelSize-2*length blocks
// Prims.prototype.addManyBlocks = function(l){
// 	notBlocks = [];
// 	for(var i = 0; i < 5*length; i++){
// 		notBlocks.push(Math.floor(Math.random()*levelSize)+ l*levelSize);
// 	}

// 	for(var i = l*levelSize; i < (l+1)*levelSize; i++){
// 		if(notBlocks.indexOf(i) < 0 && i!=45){
// 			AdjList[i].push(-1);
// 		}
// 	}
// }

//modified random prims algorithm
//edges that go up and down between floors always take precedence
Prims.prototype.makePath = function(){
	var WallList = [];
	var VerticalWalls = [];
	inMaze[0] = 1;
	var neighbors = this.getPossibleNeighbors(0);
	for(var i = 0; i < neighbors.length; i++){
		//if directly above
		if(neighbors[i] == levelSize)
			VerticalWalls.push([0, neighbors[i]]);
		else
			WallList.push([0, neighbors[i]]);
	}
	while(WallList.length > 0){
		//first process edges that go between floors
		if(VerticalWalls.length != 0){
			wallNumber = -1;
			wall = VerticalWalls.pop();
		}
		else{
			wallNumber = Math.floor(Math.random()*WallList.length);
			wall = WallList[wallNumber];
		}
		cell1 = wall[0];
		cell2 = wall[1];
		//if not in maze, take away wall between two (connect)
		if(inMaze[cell2] == 0){
			inMaze[cell2] = 1;
			AdjList[cell1].push(cell2);
			AdjList[cell2].push(cell1);
			neighbors = this.getPossibleNeighbors(cell2);
			for(var i = 0; i < neighbors.length; i++){
				//if directly above or directly below
				if(neighbors[i] == cell2+levelSize || neighbors[i] == cell2-levelSize)
					VerticalWalls.push([cell2, neighbors[i]]);
				else
					WallList.push([cell2, neighbors[i]]);
			}
		}
		//remove from wall list
		if(wallNumber >-1)
			WallList.splice(wallNumber, 1);
	}
}

//returns an array of all possible neighbors
Prims.prototype.getPossibleNeighbors = function(i){
	level = Math.floor(i/levelSize);
	neighbors = [];
	//neighbors forward and backward
	if(i - length >= level*levelSize && AdjList[i-length][0] != -1)
		neighbors.push(i-length);
	if((i + length) < (level+1)*levelSize && AdjList[i+length][0] != -1)
		neighbors.push(i+length);
	//neighbors to the left and right
	if(i%length != 0 && AdjList[i-1][0] != -1)
		neighbors.push(i-1);
	if(i%length != length -1 && AdjList[i+1][0] != -1)
		neighbors.push(i+1);
	//neibors a floor up and down
	if(level > 0 && AdjList[i-levelSize][0] != -1)
		neighbors.push(i-levelSize);
	if(level < height-1 && AdjList[i+levelSize][0] != -1)
		neighbors.push(i+levelSize);

	return neighbors;
}