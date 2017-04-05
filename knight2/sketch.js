
var posX = 0;
var posY = 0;
var cellSize = 50;
var alternate = true;
var board = [];
var current;
var prev;
var path = [];
var nodes = [];
var boardSize = 6;
var maxlen;

function setup() {
  frameRate(60);
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
		if (boardSize%2 ===0) alternate = !alternate;
  }
  
  //current = board[floor(random(boardSize))][floor(random(boardSize))];
  //start = current;
  start = board[0][0];
  current = board[0][0];
  //current.level = 1;
  maxlen = 1;
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
   var curlen = path.length;
   maxlen = Math.max(maxlen,curlen);
   //console.log(maxlen);
   document.getElementById('target').innerHTML = 'Target: '+boardSize*boardSize;
   document.getElementById('current').innerHTML = 'Current: '+curlen;
   document.getElementById('maxlen').innerHTML = 'Max so far: '+maxlen;
   
   
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
		   console.log("Finished.");
		   noLoop();
	   }
   if ( neighbours.length != 0 ){
	   prev = current;
	   var tIndex = floor(random(neighbours.length));
	   current = neighbours[tIndex];
	   //current.level = prev.level + 1;
	   current.cameFrom = prev;
	   prev.moves.push(current);
	   //current.lastAttempt = prev;
	   //console.log(current);
	   /*
	   for(var i=0; i<neighbours.length; i++){
		   if (i!=tIndex) {
			   nodes.push(neighbours[i]);
			   neighbours[i].level = current.level;
		   }
	   }
	   */
	   //line(current.x + cellSize/2,current.y + cellSize/2, prev.x + cellSize/2, prev.y + cellSize/2);
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
		   //console.log(path);
		   //pr = current.lastAttempt;
		   var options = pr.getUnvisitedNeighbours(board);
		   
		   for (let n of options){
			   
			   if (n === lastCell) {continue;}
			   //if (n.cameFrom != undefined && n.cameFrom.i === pr.i && n.cameFrom.j === pr.j) {continue;}
			   if (n.cameFrom === pr){continue;}
			   if (pr.moves.indexOf(n) != -1){continue};
			   //if (n.lastAttempt != undefined) continue;
			   //console.log(n);
			   current = n;
			   current.cameFrom = pr;
			   current.level = pr.level + 1;
			   pr.moves.push(current);
			   /*
			   for (var i=0;i<boardSize;i++){
				   for (var j=0;j<boardSize;j++){
					   if (board[i][j].level > current.level){
							board[i][j].moves = [];
							board[i][j].level = 9999;
						}
				   }
			   }
			   */
			   found = true;
			   break;
		   }
		   if (found) break;
		   
			//console.log("No neighbours left in this level. Moving up.")
			lastCell = path.pop();
			lastCell.visited = false;
			lastCell.moves = [];
			
			//current = pr;
			//t.lastAttempt = path[path.length - 1];
	   }
	   //console.log(prev);
	   //console.log(current);
	   
	   
		   //current.cameFrom = null;
		   //path.pop();
		   //if (nodes.length > 0) {
			   /*
			   current = nodes.pop();
			   var temp = path[path.length - 1];
				while(temp != undefined && temp.level >= current.level - 1){
					var node = path.pop();
					node.visited = false;
					node.level = node.level - 1;
					temp = path[path.length - 1]
				}
				*/
				
				
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



