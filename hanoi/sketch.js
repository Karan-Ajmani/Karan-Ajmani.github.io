// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var disk1;
var disk2;
var disk3;
var tower1;
var tower2;
var tower3;
var towerwidth = 10;
var towerheight = 100;
var towerspacing = 150;
var moves = [];
var i = 0;

function setup() {
  var canvas = createCanvas(600,300);
  canvas.parent('hanoi');
  tower1 = new Tower(width/2-towerspacing,height/2,towerwidth,towerheight);
  tower2 = new Tower(width/2,height/2,towerwidth,towerheight);
  tower3 = new Tower(width/2+towerspacing+towerwidth,height/2,towerwidth,towerheight);
  
  
  /* Need to make this dynamic */
  
  
  disk5 = new Disk(100);
  tower2.disks.push(disk5);
  disk5.x = width/2 - towerspacing*0 - disk5.w/2;
  disk5.y = height/2 + towerheight - disk5.h;
  
  disk1 = new Disk(80);
  tower2.disks.push(disk1);
  disk1.x = width/2 - towerspacing*0 - disk1.w/2;
  disk1.y = height/2 + towerheight - disk1.h*2;
  
  disk2 = new Disk(60);
  tower2.disks.push(disk2);
  disk2.x = width/2 - towerspacing*0 - disk2.w/2;
  disk2.y = height/2 + towerheight - disk2.h*3;
  
  disk3 = new Disk(40);
  tower2.disks.push(disk3);
  disk3.x = width/2 - towerspacing*0 - disk3.w/2;
  disk3.y = height/2 + towerheight - disk3.h*4;
  
  disk4 = new Disk(30);
  tower2.disks.push(disk4);
  disk4.x = width/2 - towerspacing*0 - disk4.w/2;
  disk4.y = height/2 + towerheight - disk4.h*5;
  
  hanoi(5,tower2,tower1,tower3);

 }

function draw() {
  background(255);
 
  // Towers and Base
  tower1.show();
  tower2.show();
  tower3.show();
  rect(width/2- towerspacing*2 + 50,height/2+100,2*(towerspacing*2+10-50) ,10);

  fill(0);
  textSize(13);
  textFont('Verdana');
  text("Start",width/2-10,height/2+30+towerheight);
  text("End",width/2-towerspacing-10,height/2+30+towerheight);
  
  // Disks
	disk1.show();
	disk2.show();
	disk3.show();
	disk4.show();
	disk5.show();
	
	if (disk1.moving === 0 && disk2.moving ===0 && disk3.moving ===0 && disk4.moving ===0 && disk5.moving ===0  && i<moves.length){
		//console.log(moves[i]);
		move(moves[i].towerFrom,moves[i].towerTo);
		i++;
	}
	
}


function move(towerFrom, towerTo){
	moveDisk = towerFrom.disks.pop();
	towerTo.disks.push(moveDisk);
	moveDisk.moving = 1;
	moveDisk.moveFrom = towerFrom;
	moveDisk.moveTo = towerTo;

}

// Pre-Generate moves
function hanoi(height,fromT,toT,withT){
	if (height >=1){
		hanoi(height-1,fromT,withT,toT);
		var move = {
			towerFrom: fromT,
			towerTo: toT
		};
		moves.push(move);
		hanoi(height-1,withT,toT,fromT);
	}
}
