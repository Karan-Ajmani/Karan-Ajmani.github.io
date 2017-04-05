// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Dinosaur(dinoImg){
	this.posx = 50;
	this.x = 0 + this.posx;
	this.imgHeight = 47;
	this.imgWidth = 44;
	// 8 is minor adjustment on the road
	this.y = height - this.imgHeight - 8;
	this.xspeed = 0;
	this.yspeed = 0;
	this.jumpspeed = 8;
	this.jumpheight = 160;
	this.imgCutX = 88;
	//Adding variable to prevent any other keypress when jumping
	this.midAir = 0;
	//Adding variable to make dino stay midair for a few frames
	this.stayMidAir = 0;
	
	this.show = function() {
		//stroke(0,0,0);
		//ellipse(this.x, this.y, this.ellipsex,this.ellipsey);
		image(dinoImg,this.x,this.y,this.imgWidth,this.imgHeight,this.imgCutX,0,this.imgWidth,this.imgHeight);
		this.y += this.yspeed;
		if (this.y <= height-this.jumpheight){
			// Hardcoding 7 midAir frames. Probably should store in class attr
			if (this.stayMidAir < 8) {
				this.stayMidAir +=1;
				this.yspeed = 0;
			}
			else {
				this.stayMidAir = 0 ;
				this.yspeed = (this.jumpspeed)*1;
			}
		}
		if (this.y >= height-this.imgHeight-8){
			this.yspeed = 0;
			if (this.midAir === 1) {
				this.midAir = 0;
				this.imgCutX = 88;
			}
		}
  }
  
	this.jump = function() {
		this.yspeed = (this.jumpspeed)*-1;
		if (this.midAir === 0) this.midAir = 1;
	}
	
}