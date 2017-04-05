// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var grid = [];
var squareedge = 30;
var hexaedge = 40;
var stack = [];
var canvasSize = 600;
//var numCells = canvasSize/squareedge;
var current;
var stack = [];
var type = 'square';


//Path Finding
var realm = 'maze';
var openSet = [];
var closedSet = [];
var start = 0;
var end ;


function heuristic(a,b){
	return int(dist(a.x,a.y,b.x,b.y));
}

function setup() {
  frameRate(60);
  var canvas = createCanvas(canvasSize+1, canvasSize+1);
  canvas.parent('maze');
  if (type === 'square') {
	for (var x=0;x<canvasSize;x+=squareedge){
		for (var y=0;y<canvasSize;y+=squareedge){
			grid.push(new Cell(x,y,squareedge,canvasSize));
		}
	}
  }
  else{
	
	var columnNo = 0;
	var startx = 0;
	var starty = hexaedge;
	var gridindex = 0;
	while(startx +hexaedge*3/4 < 600){
		if (columnNo%2 == 0) starty=hexaedge;
		else starty=hexaedge/2;
		while(starty + hexaedge/2 < 600){
			grid[gridindex]=new HexaCell(startx,starty,hexaedge,canvasSize,gridindex);
			gridindex++;
			starty+=hexaedge;
		}
		startx+=hexaedge*3/4;
		columnNo++;
	}
  }
  //end = grid.length - 1 - canvasSize/squareedge + 1;
  end = grid.length - 1;
  current = grid[0];
  
  /*
  var neighbours = current.getUnvisitedNeighbours(grid);
  for (let cell of neighbours){
	  cell.setVisited();
  }
  */
  openSet.push(0);
  
 }

function draw() {
  background(255);
 
  for (var i=0;i<grid.length;i++){
	  grid[i].show();
  }
  
	if (realm === 'maze'){
	
  // DFS with backtracking
		if (current.visited === false)  current.setVisited();
		neighbours = current.getUnvisitedNeighbours(grid);
		if (neighbours.length > 0){
			stack.push(current);
			var randomIndex = floor(random()*10+1)%neighbours.length;
			var prevCell = current;
			current = neighbours[randomIndex];
			neighbours.splice(randomIndex,1);
			current.connectedNeighbours.push(prevCell);
			prevCell.connectedNeighbours.push(current);
			
			if (type === 'square'){
				var diffx = prevCell.x - current.x;
				//console.log(diffx);
			
				if (diffx === -1*squareedge) {
					prevCell.showWalls[2] = 0;
					current.showWalls[3] = 0;
				}
				else if (diffx === 1*squareedge){
					prevCell.showWalls[3] = 0;
					current.showWalls[2] = 0;
				}
			
				var diffy = prevCell.y - current.y;
				//console.log(diffy);
			
				if (diffy === -1*squareedge){
					prevCell.showWalls[1] = 0;
					current.showWalls[0] = 0;
				}
				else if (diffy === 1*squareedge){
					prevCell.showWalls[0] = 0;
					current.showWalls[1] = 0;
				}
			}
			else{
				var diff = current.currentGridIndex - prevCell.currentGridIndex;
				var numcells = canvasSize/hexaedge - 1;
				//Move Down
				if ( diff === 1){
					current.showWalls[0] = 0;
					prevCell.showWalls[1] = 0;
				}
				//Move up
				else if ( diff === -1 ){
					current.showWalls[1] = 0;
					prevCell.showWalls[0] = 0;
				}
				//Move bottom left
				else if ( current.y - prevCell.y === hexaedge/2 && prevCell.x - current.x === hexaedge*3/4){
					current.showWalls[4] = 0;
					prevCell.showWalls[3] = 0;
				}
				//Move top left
				else if ( current.y - prevCell.y === -hexaedge/2 && prevCell.x - current.x === hexaedge*3/4){
					current.showWalls[5] = 0;
					prevCell.showWalls[2] = 0;
				}
				//Move bottom right
				else if ( current.y - prevCell.y === hexaedge/2 && prevCell.x - current.x === -hexaedge*3/4){
					current.showWalls[2] = 0;
					prevCell.showWalls[5] = 0;
				}
				// move top right
				else if ( current.y - prevCell.y === -hexaedge/2 && prevCell.x - current.x === -hexaedge*3/4){
					current.showWalls[3] = 0;
					prevCell.showWalls[4] = 0;
				}
				
			}

			//while(neighbours.length > 0){
			//	stack.push(neighbours[0]);
			//	neighbours.splice(0,1);
			//}
			
		}
		else{
			current = stack.pop();
			//current.setBacktracked();
		}
		if (current) current.highlight();
		
		if (stack.length === 0){
			console.log("Finished maze generation. Moving on to pathfinding.")
			realm = 'pathfinding';
		}
	}
	else{
		var tempCurrent;
		if ( openSet.length > 0 ){
			tempCurrent = openSet[0];
			var tempIndex = 0;
			for (var i=1;i<openSet.length;i++){
				if (grid[tempCurrent].f > grid[openSet[i]].f){
					tempCurrent = openSet[i];
					tempIndex = i;
				}
			}
			
			if (tempCurrent === end){
				console.log('finished');
				grid[tempCurrent].highlight_1();
				noFill();
				stroke(0,0,255,1212);
				beginShape();
				var t = tempCurrent;
				while(t != start){
					if (type === 'square')
						vertex(grid[t].x+squareedge/2,grid[t].y+squareedge/2);
					else
						vertex(grid[t].x+hexaedge/2,grid[t].y);
					//console.log(grid[t].f);
					t = grid[t].cameFrom;
				}
				endShape();
				noLoop();
				return;
			}
			
			grid[tempCurrent].highlight_1();
			openSet.splice(tempIndex,1);
			closedSet.push(tempCurrent);
			for (var neighbor of grid[tempCurrent].connectedNeighbours){
				if (!closedSet.includes(neighbor.currentGridIndex)){
					var tempScore = grid[tempCurrent].g + 1;
					
					if (!openSet.includes(neighbor.currentGridIndex)){
						openSet.push(neighbor.currentGridIndex);
					}
					else if (tempScore >= neighbor.g) continue;
					
					neighbor.cameFrom = grid[tempCurrent].currentGridIndex;
					neighbor.g = tempScore;
					//neighbor.f = neighbor.g + heuristic(neighbor, grid[end]);
					neighbor.f = neighbor.g;
					
				}
				
			}
			grid[tempCurrent].closedS = true;
			noFill();
			stroke(0,0,255,1212);
			beginShape();
			var t = tempCurrent;
			while(t != start){
				if (type === 'square')
					vertex(grid[t].x+squareedge/2,grid[t].y+squareedge/2);
				else
					vertex(grid[t].x+hexaedge/2,grid[t].y);
				//console.log(grid[t]);
				t = grid[t].cameFrom;
			}
			endShape();
			
			
		}
		else{
			console.log('No Path');
			noLoop();
		}
		
		
	}
	
	
}


function resetcanvas(g){
	type = g;
	noLoop();
	grid = [];
    stack = [];
	openSet = [];
	closedSet = [];
	realm = 'maze';
	setup();
	loop();
}
