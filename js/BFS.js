var BFS = function(AdjList){
	var AdjList = AdjList;
	parent = [];

	for(var i=0; i < AdjList.length; i++){
		parent.push(-1);
	}
	parent[0] = 0;
}
BFS.prototype.parents = function(){
	return parent;
}

BFS.prototype.isReachable = function(start, end){
	this.search(start, end);
	if(parent[end] == -1)
		return false;
	else
		return true;
}

BFS.prototype.search = function(start, end){
	var queue = [];
	queue.push(start);
	// var previous = start;
	while(queue.length != 0){
		var cell = queue.shift();
		var neighbors = AdjList[cell];
		for(var i = 0; i < neighbors.length; i++){
			var neighbor = neighbors[i]
			if(parent[neighbor] == -1){
				queue.push(neighbor);
				parent[neighbor] = cell;
			}
			if(neighbor == end)
				return;
		}
		// previous = cell;
	}
}