// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function Cloud(i,numClouds,cloudImg){
	this.x = 600*(i+1);
	this.y = height - 110;
	this.xspeed = -1;
	
	this.show = function() {
		
		if (numClouds == 0)	{	
			image(cloudImg,this.x,this.y);
		}
		else {
			image(cloudImg,this.x-300,this.y-10);
			image(cloudImg,this.x,this.y+10);
		}
		
		this.x += this.xspeed;
  }

	
}