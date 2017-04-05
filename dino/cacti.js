// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Cacti(i,imgCut,w,h,cactusImg) {
	var spacing = [100,125,150];
	var a = [-1,1];
	this.x = Math.floor(parseInt(parseInt(width)+ parseInt(i*600) + parseInt(spacing[(Math.floor(Math.random()*10) +1)%3])*parseInt(a[Math.floor(Math.random()*10 +1)%2])));
	//this.x = 600;
	this.height = h;
	// 8 is adjustment trial error.
	this.y = height - this.height - 8;
	this.width = w;
	this.imgCutX = imgCut;
	this.xspeed = -5.5;
	this.img = cactusImg;
	
	this.show = function() {
		image(this.img,this.x,this.y,this.width,this.height,this.imgCutX,0,this.width,this.height);
		this.x += this.xspeed;
	}
}










