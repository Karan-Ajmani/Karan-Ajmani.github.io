// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Road(i,roadImg){
	this.x = 600*i;
	this.start = 600*i;
	this.y = height-20;
	this.xspeed = -5.5;
	
	this.show = function() {
		
		image(roadImg,this.x,this.y);
		this.x += this.xspeed;
  }

	
}