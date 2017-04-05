// Karandeep Ajmani
// p5 Inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Disk(width) {
	
	this.x = 0;
	this.y = 0;
	this.w = width;
	this.h = 15;
	this.xspeed = 0;
	this.yspeed = 0;
	this.moving = 0;
	this.moveFrom;
	this.moveTo;
	this.moveSpeed = 5;
	
	this.show = function(){
		
		stroke(255);
		/*
		if (this.sno === 1) {
			fill(255,0,0);
			rect(this.x,this.y,70,15);
			}
		else if (this.sno === 2){
			fill(0,255,0);
			rect(this.x,this.y,70,15);
			
		} 
		else {
			fill(0,0,255);
			rect(this.x,this.y,70,15);
		}
		*/
		fill(255,0,0);
		rect(this.x,this.y,this.w + towerwidth,this.h);
		this.x += this.xspeed;
		this.y += this.yspeed;
		
		if (this.moving === 1){
			//console.log("in here");
			if (this.moveFrom.x < this.moveTo.x){
				//console.log("in here");
				//console.log(this.y + " "+this.x+" " +this.moveTo.x);
				if (this.y > height/2 - 100 && this.x < this.moveTo.x - this.w/2 ){
					this.yspeed = -1*this.moveSpeed;
				}
				if (this.y === height/2 - 100 && this.x  < this.moveTo.x - this.w/2 ){
					this.yspeed = 0;
					this.xspeed = 1*this.moveSpeed;
				}
				if (this.y === height/2 - 100 && this.x === this.moveTo.x - this.w/2){
					//console.log("in here");
					this.xspeed = 0;
					this.yspeed = 1*this.moveSpeed;
				}
				if (this.y === height/2 + 100 - (this.moveTo.disks.length)*this.h  && this.x === this.moveTo.x - this.w/2){
					//console.log("in here");
					this.yspeed = 0;
					this.moving = 0;
					//this.moveTo.disks.push(this);
				}
			
			}
			else{
				if (this.y > height/2 - 100 && this.x > this.moveTo.x - this.w/2 ){
					this.yspeed = -1*this.moveSpeed;
				}
				if (this.y === height/2 - 100 && this.x  > this.moveTo.x - this.w/2 ){
					this.yspeed = 0;
					this.xspeed = -1*this.moveSpeed;
				}
				if (this.y === height/2 - 100 && this.x === this.moveTo.x - this.w/2){
					//console.log("in here");
					this.xspeed = 0;
					this.yspeed = 1*this.moveSpeed;
				}
				if (this.y === height/2 + 100 - (this.moveTo.disks.length)*this.h && this.x === this.moveTo.x - this.w/2){
					//console.log("in here");
					this.yspeed = 0;
					this.moving = 0;
					//this.moveTo.disks.push(this);
				}
			}
		}
		
		
	
	}
	
	
	
	
}