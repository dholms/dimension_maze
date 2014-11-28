var Prims = function(length, height){
	length = length;
	height = height;
	levelSize = length * length;
	totalSize = levelSize * height;
	AdjList = [];
	for(var i = 0; i < totalSize; i++){
		AdjList.push([]);
	}
}

Prims.prototype.construct = function(){
	 for(var i = 0; i < height; i++){
	 	if(i%2 == 0){
	 		this.addBlocks(i, length);
	 	}
	 	else{
	 		this.addBlocks(i, levelSize);
	 	}
	 }
	 return AdjList
}

//l is level, b is max number of blocks
Prims.prototype.addBlocks = function(l, b){
	blocks = [];
	for(var i = 0; i < b; i++){
		blocks.push(Math.floor(Math.random()*levelSize)); //mostly fill a level with blocks max of (levelSize-length) but probably less from repeast values
	}

	for(var i = 0; i < blocks.length; i++){
		if(blocks[i] != 20 && blocks[i] != 45)
			AdjList[blocks[i] + l*levelSize].push(-1);  //adds to adjList
	}
}

Prims.prototype.possibleNeighbors = function(){
	
}