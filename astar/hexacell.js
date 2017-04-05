// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function HexaCell(i,j,edge,canvasSize,gridIndex) {
	
	this.x = i;
	this.y = j;
	this.edgeSize = edge;
	this.visited = false;
	this.canvasSize = canvasSize;
	this.currentGridIndex = gridIndex;
	//Top,Bottom,Top Left,Bottom Left,Top Right,Bottom Right
	this.showWalls = [1,1,1,1,1,1];
	
	//Pathfinding
	this.connectedNeighbours = [];
	this.cameFrom = null;
	this.g = 0;
	this.f = 1000000;
	this.closedS = false;	
	
	this.highlight_1 = function(){
		
		fill(255,0,0,111);
		noStroke();
		triangle(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
		rect(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.edgeSize/2,this.edgeSize);
		triangle(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
	
	}
	
	//number of cells horizontally. I think this is the correct formula?
	this.cellsHorizontal = this.canvasSize/(this.edgeSize*3/2)*2 -1;
	
	
	this.show = function(){
		
		//stroke(255,255,255);
		stroke(0);
		//console.log(this.showWalls);
		if (this.showWalls[0] === 1) //Top wall
		line(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize*3/4,this.y-this.edgeSize/2);
		if (this.showWalls[1] === 1) //Bottom wall
		line(this.x+this.edgeSize/4,this.y+this.edgeSize/2,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
		if (this.showWalls[2] === 1) //Top Left
		line(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2);
		if (this.showWalls[3] === 1) //Bottom Left wall
		line(this.x,this.y,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
		if (this.showWalls[4] === 1) //Top Right
		line(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y);
		if (this.showWalls[5] === 1) //Bottom Right
		line(this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
		
		
		if (this.visited === true){
			fill(255,255,0,100);
			noStroke();
			triangle(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
			rect(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.edgeSize/2,this.edgeSize);
			triangle(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
		
		}
		
		if (this.closedS === true){
			fill(255,0,0,100);
			noStroke();
			triangle(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
			rect(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.edgeSize/2,this.edgeSize);
			triangle(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
		}	
		
	}
	
	this.setVisited = function(){
		
		fill(255,255,0,100);
		noStroke();
		triangle(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
		rect(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.edgeSize/2,this.edgeSize);
		triangle(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
		this.visited = true;
	}
	
	
	this.highlight = function(){
		
		fill(0,125,125,1250);
		noStroke();
		triangle(this.x,this.y,this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.x+this.edgeSize/4,this.y+this.edgeSize/2);
		rect(this.x+this.edgeSize/4,this.y-this.edgeSize/2,this.edgeSize/2,this.edgeSize);
		triangle(this.x+this.edgeSize*3/4,this.y-this.edgeSize/2,this.x+this.edgeSize,this.y,this.x+this.edgeSize*3/4,this.y+this.edgeSize/2);
	
	}
	
	
	this.getUnvisitedNeighbours = function(grid){
		
		
		/* Neigbour cells
			1. currentGridIndex - 1
			2. currentGridIndex + 1
			3. currentGridIndex - numCells -1
			4. currentGridIndex - numCells
			5. currentGridIndex + numCells -1
			6. currentGridIndex + numCells
		*/
		var numCells = this.canvasSize/this.edgeSize -1;
		
		// I should probably generate this more elegantly but I am noob 
		var neighbours = []
		if (this.y - this.edgeSize > 0 ) if (grid[this.currentGridIndex - 1].visited === false) neighbours.push(grid[this.currentGridIndex - 1]);
		if (this.y + this.edgeSize*3/2 < this.canvasSize) if (grid[this.currentGridIndex + 1].visited === false) neighbours.push(grid[this.currentGridIndex + 1]);
		
		
		if (this.x>0){
			
			leftPossibleNeighbours = [this.currentGridIndex - numCells -1, this.currentGridIndex - numCells, this.currentGridIndex  -numCells + 1];
			for ( let ind of leftPossibleNeighbours){
				if (ind>=0 && ind<=(this.cellsHorizontal*numCells - 1))
				if (this.x - grid[ind].x === this.edgeSize*3/4 && abs(this.y - grid[ind].y) === this.edgeSize/2 && grid[ind].visited === false)
					neighbours.push(grid[ind]);
			}
			
		}
		if (this.currentGridIndex<this.cellsHorizontal*numCells - numCells - 1){
						
			rightPossibleNeighbours = [this.currentGridIndex + numCells -1, this.currentGridIndex + numCells, this.currentGridIndex  +numCells + 1];
			for ( let ind of rightPossibleNeighbours){
				if (ind>=0 && ind<=(this.cellsHorizontal*numCells - 1))
				if (this.x - grid[ind].x === -this.edgeSize*3/4 && abs(this.y - grid[ind].y) === this.edgeSize/2 && grid[ind].visited === false)
					neighbours.push(grid[ind]);
			}
			
		}
		return neighbours;
	}
	
	
}