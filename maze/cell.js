// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Cell(i,j,edge,canvasSize) {
	
	this.x = i;
	this.y = j;
	this.edgeSize = edge;
	this.visited = false;
	this.canvasSize = canvasSize;
	this.currentGridIndex = (this.x/this.edgeSize)*(this.canvasSize/this.edgeSize) + (this.y/this.edgeSize);
	this.backtracked = false;
	//Top,Bottom,Right,Left
	this.showWalls = [1,1,1,1];
	
	
	this.show = function(){
		
		//stroke(255,255,255);
		stroke(0,0,0);
		//console.log(this.showWalls);
		if (this.showWalls[3] === 1) //Left wall
		line(this.x,this.y,this.x,this.y+this.edgeSize);
		if (this.showWalls[0] === 1) //Top wall
		line(this.x,this.y,this.x+this.edgeSize,this.y);
		if (this.showWalls[1] === 1) //Bottom wall
		line(this.x,this.y+this.edgeSize,this.x+this.edgeSize,this.y+this.edgeSize);
		if (this.showWalls[2] === 1) //Right wall
		line(this.x+this.edgeSize,this.y,this.x+this.edgeSize,this.y+this.edgeSize);
		
		
		if (this.visited === true){
			fill(255,255,0,100);
			noStroke();
			rect(this.x,this.y,this.edgeSize,this.edgeSize);
		}
		/*
		if (this.backtracked === true){
			fill(0,128,128);
			//stroke(0,0,0,1);
			noStroke();
			rect(this.x,this.y,this.edgeSize,this.edgeSize);
		}
			*/
	}
	
	this.setVisited = function(){
		fill(255,255,0,100);
		noStroke();
		rect(this.x,this.y,this.edgeSize,this.edgeSize);
		this.visited = true;
	}
	
	this.highlight = function(){
		fill(0,125,125,1250);
		noStroke();
		rect(this.x,this.y,this.edgeSize,this.edgeSize);
	}
	
	/*
	this.setBacktracked = function(){
		fill(0,128,128);
		//stroke(51,51,51);
		rect(this.x,this.y,this.edgeSize,this.edgeSize);
		this.backtracked = true;
	}
	*/
	this.getUnvisitedNeighbours = function(grid){
		
		 /*8 Neighbour cells are 
			1. currentGridIndex - 1
			2. currentGridIndex + 1
			3. currentGridIndex - numCells
			4. currentGridIndex + numCells,
			5. currentGridIndex - numCells + 1
			6. currentGridIndex - numCells - 1
			7. currentGridIndex + numCells + 1 
			8. currentGridIndex + numCells - 1
		*/
		
		/* However for the purpose of maze generation we require only 4 
			1. currentGridIndex - 1
			2. currentGridIndex + 1
			3. currentGridIndex - numCells
			4. currentGridIndex + numCells
		*/
		
		
		//console.log(this.currentGridIndex);
		// I should probably generate this more elegantly but I am noob 
		var neighbours = []
		var numcells = this.canvasSize/this.edgeSize;
		if (grid[this.currentGridIndex].y > 0 ) if (grid[this.currentGridIndex - 1].visited === false) neighbours.push(grid[this.currentGridIndex - 1]);
		if (grid[this.currentGridIndex].y  < this.canvasSize - this.edgeSize) if (grid[this.currentGridIndex + 1].visited === false) neighbours.push(grid[this.currentGridIndex + 1]);
		if (grid[this.currentGridIndex].x > 0 ) {
			if (grid[this.currentGridIndex - numcells].visited === false) neighbours.push(grid[this.currentGridIndex - numcells]);
			/*
			if (grid[this.currentGridIndex - numcells].y > 0) if (grid[this.currentGridIndex - numcells - 1 ].visited === false) neighbours.push(grid[this.currentGridIndex - numcells - 1]); 
			if (grid[this.currentGridIndex - numcells].y < this.canvasSize - this.edgeSize) if (grid[this.currentGridIndex - numcells + 1 ].visited === false ) neighbours.push(grid[this.currentGridIndex - numcells + 1]);  
			*/
		}
		if (grid[this.currentGridIndex].x < this.canvasSize - this.edgeSize) {
			if (grid[this.currentGridIndex + numcells].visited === false) neighbours.push(grid[this.currentGridIndex + numcells]);
			/*
			if (grid[this.currentGridIndex + numcells].y > 0) if (grid[this.currentGridIndex + numcells - 1 ].visited === false) neighbours.push(grid[this.currentGridIndex + numcells - 1]);  
			if (grid[this.currentGridIndex + numcells].y < this.canvasSize - this.edgeSize) if (grid[this.currentGridIndex + numcells + 1 ].visited === false) neighbours.push(grid[this.currentGridIndex + numcells + 1]); 
			*/
		}
		return neighbours;
	}
	
	
}
