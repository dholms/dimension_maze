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
	//push start to queue then start bfs
	var queue = [];
	queue.push(start);
	while(queue.length != 0){
		//get the first cell to be added to queue
		var cell = queue.shift();
		var neighbors = AdjList[cell];
		//if not already in traversal, add to the queue
		for(var i = 0; i < neighbors.length; i++){
			var neighbor = neighbors[i]
			if(parent[neighbor] == -1){
				queue.push(neighbor);
				parent[neighbor] = cell;
			}
			if(neighbor == end)
				return;
		}
	}
}