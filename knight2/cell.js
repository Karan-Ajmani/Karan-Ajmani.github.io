// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Cell(color, i , j) {
		
	this.i = i;
	this.j = j;
	this.x = posX + j*cellSize;
	this.y = posY + i*cellSize;
	this.visited = false;
	this.color = color;
	
	this.cameFrom;
	this.start = false;
	this.moves = [];
	
	this.show = function(){
		
				stroke(0);
		strokeWeight(2);
		
	if (this.start){
			fill(211,211,211);
			rect(this.x,this.y,cellSize,cellSize);
		}
		else{
			fill(this.color);
			rect(this.x,this.y,cellSize,cellSize);
		}
		
		if (this.visited){
			stroke(255,0,0);
			strokeWeight(5);
			point(this.x + cellSize/2,this.y + cellSize/2);
		}
		
	}
	
	// Horse Moves
	this.getUnvisitedNeighbours = function(board){
		
		var neighbours = [];
		
		/* Normal Neighbours(Non diagonals)
		if (this.i > 0){
			if (!this.visited) neighbours.push(board[this.i - 1][this.j]);
		}
		if (this.j > 0){
			if (!this.visited) neighbours.push(board[this.i][this.j - 1]);
		}
		if (this.i < boardSize - 1){
			if (!this.visited) neighbours.push(board[this.i + 1][this.j]);
		}
		if (this.j < boardSize - 1){
			if (!this.visited) neighbours.push(board[this.i][this.j + 1]);
		}
		return neighbours;
		*/
		
		// Horse Moves
		if (this.i - 2 >= 0){
			if (this.j - 1 >= 0){
				if (!board[this.i - 2][this.j - 1].visited) neighbours.push(board[this.i - 2][this.j - 1]);
			}
			if (this.j + 1 < boardSize){
				if (!board[this.i - 2][this.j + 1].visited) neighbours.push(board[this.i - 2][this.j + 1]);
			}
		}
		if (this.i - 1 >= 0){
			if (this.j - 2 >= 0){
				if (!board[this.i - 1][this.j - 2].visited) neighbours.push(board[this.i - 1][this.j - 2]);
			}
			if (this.j + 2 < boardSize){
				if (!board[this.i - 1][this.j + 2].visited) neighbours.push(board[this.i - 1][this.j + 2]);
			}
		
		}
		if (this.i + 1 < boardSize){
			if (this.j - 2 >= 0){
				if (!board[this.i + 1][this.j - 2].visited) neighbours.push(board[this.i + 1][this.j - 2]);
			}
			if (this.j + 2 < boardSize){
				if (!board[this.i + 1][this.j + 2].visited) neighbours.push(board[this.i + 1][this.j + 2]);
			}
		}
		if (this.i + 2 < boardSize){
			if (this.j - 1 >= 0){
				if (!board[this.i + 2][this.j - 1].visited) neighbours.push(board[this.i + 2][this.j - 1]);
			}
			if (this.j + 1 < boardSize){
				if (!board[this.i + 2][this.j + 1].visited) neighbours.push(board[this.i + 2][this.j + 1]);
			}
		}
		
		return neighbours;
		
	}
	
}