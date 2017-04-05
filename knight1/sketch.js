
var posX = 0;
var posY = 0;
var cellSize = 50;
var alternate = true;
var board = [];
var current;
var prev;
var path = [];
var boardSize = 8;

function setup() {
  frameRate(5);
  var canvas = createCanvas(boardSize*cellSize+5, boardSize*cellSize+5);
  canvas.parent('board');

  for (var i = 0; i < boardSize; i++){
	  board[i] = [];
  }
  
  for (var i = 0; i < boardSize; i++){
		for (var j = 0; j < boardSize; j++){
			if (alternate) {
				alternate = false;
				board[i][j] = new Cell(255,i,j);
			}
			else {
				alternate = true;
				board[i][j] = new Cell(0,i,j);
			}	
		}
		if (boardSize%2 == 0)alternate = !alternate;
  }
  
  current = board[floor(random(boardSize))][floor(random(boardSize))];
  start = current;
  //start = board[0][0];
  //current = board[0][0];
  //maxlen = 1;
  start.start = true;
  
    
}

function draw() {
  background(255);
  
   current.visited = true;
  
  for (var i = 0; i < boardSize; i++){
		for (var j = 0; j < boardSize; j++){
			board[i][j].show();
		}
	}
 
  stroke(0);
  textSize(9);
  textFont('Verdana');
  text("Start",start.x+cellSize/2-10,start.y+cellSize/2+10);  
  
   var neighbours = current.getUnvisitedNeighbours(board);
   path.push(current);
   //maxlen = Math.max(maxlen,path.length);
   //console.log(maxlen);
   
   if (path.length === boardSize*boardSize){
		   console.log("Finished.");
		   stroke(0);
		   strokeWeight(2);
		   fill(211,211,211);
		   rect(current.x,current.y,cellSize,cellSize);
		   stroke(255,0,0);
		   strokeWeight(5);
		   point(current.x + cellSize/2,current.y + cellSize/2);
		   stroke(0);
		   textSize(9);
			textFont('Verdana');
			text("End",current.x+cellSize/2-10,current.y+cellSize/2+10);
		   //noLoop();
	   }
   
    stroke(255,0,0);
	strokeWeight(2);
	noFill();
	beginShape();
	for(var i=0;i<path.length;i++){
		vertex(path[i].x + cellSize/2,path[i].y + cellSize/2);
		//console.log(path[i].lastAttempt);
	}
	endShape();
   
   if (path.length === boardSize*boardSize){
		   noLoop();
	   }
   if ( neighbours.length != 0 ){
	   prev = current;
	   /*var tIndex = floor(random(neighbours.length));
	   current = neighbours[tIndex];
	   */
	   var tuples = [];
	   for (let n of neighbours){
		   tuples.push([n,n.getUnvisitedNeighbours(board)]);
	   }
	   tuples.sort(function(a, b) {
			a = a[1];
			b = b[1];
			return a < b ? -1 : (a > b ? 1 : 0);	
		});
	    current = tuples[0][0];	 
	    current.cameFrom = prev;
	    prev.moves.push(current);

   }
   else{
	   //console.log("No neighbours found. Backtracking");
	   
	   current.visited = false;
	   var lastCell = path.pop();
	   var found = false;
	   var pr;
	   while(!found){
		   found = false;
		   
		   if (path.length === 0){
				console.log("Stuck");
				noLoop();
			}
		   //console.log(path.length);	
		   pr = path[path.length - 1];
		    var options = pr.getUnvisitedNeighbours(board);
		   var tuples = [];
		   for (let n of options){
			   
			   if (n === lastCell) {continue;}
			   //if (n.cameFrom != undefined && n.cameFrom.i === pr.i && n.cameFrom.j === pr.j) {continue;}
			   if (n.cameFrom === pr){continue;}
			   if (pr.moves.indexOf(n) != -1){continue};
			   //if (n.lastAttempt != undefined) continue;
			   //console.log(n);
			   /*
			   current = n;
			   current.cameFrom = pr;
			   current.level = pr.level + 1;
			   pr.moves.push(current);
			   */
			   found = true;
			   tuples.push([n,n.getUnvisitedNeighbours(board)]);
			   
		   }
		   if (found) {
			   tuples.sort(function(a, b) {
				a = a[1];
				b = b[1];
				return a < b ? -1 : (a > b ? 1 : 0);	
			});
			current = tuples[0][0];	 
			current.cameFrom = pr;
			pr.moves.push(current);   
			 break;
		   }
		   else{
			lastCell = path.pop();
			lastCell.visited = false;
			lastCell.moves = [];   
		   }
			//console.log("No neighbours left in this level. Moving up.")
			
			
			
	   }
	   
				
				
	   }
    
	
}

function replay(){
	
	noLoop();
	board=[];
	path=[];
	setup();
	loop();
	
	
}

function setBoardSize(size){
	boardSize = size;
	replay();
}




