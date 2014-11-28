var Player = function(x, y, z, context, cube){
	cur_x = x;
	cur_y = y;
	cur_z = z;
	context = context;
	this.cube = cube;
	player_image = document.getElementById("player");
	erase_image = document.getElementById("erase");
}

Player.prototype.move = function(m){
	//left 0, up 1, right 2, down 3
	if(!this.cube.canMove(cur_x, cur_y, cur_z, m))
		return;
	this.erase();
	if(m == 0){
		cur_x--;
	}
	if(m == 1){
		cur_y--;
	}
	if(m == 2){
		cur_x++;
	}
	if(m == 3){
		cur_y++;
	}
	if(m==32){
		this.changeLevel(cur_z + 1);
	}
	if(m==44){
		this.changeLevel(cur_z - 1);
	}
	
	this.draw();
	if(cur_x == 4 && cur_y == 0 && cur_z ==4)
		this.cube.win();

}

Player.prototype.changeLevel = function(m){
	cur_z = m;
	this.cube.drawLevel(m);
}

Player.prototype.draw = function(){
	context.drawImage(player_image, (cur_x+1)*32, (cur_y + 1)*32);
}

Player.prototype.erase = function(){
	context.drawImage(erase_image, (cur_x+1)*32, (cur_y+1)*32);
}
