// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

function SunRay(){
	this.x = 70;
	this.y = height/4;
	this.radius = 36;
	this.endRadius = 125;
	
	this.show = function() {
		//if (this.radius >= 100) this.radius = 35;
		
		
		// Rainbow attempt failed
		/*
		stroke(255,0,0);
		noFill();
		ellipse(70,height/4,this.radius,this.radius);
		stroke(255,127,0);
		noFill();
		ellipse(70,height/4,this.radius-10,this.radius-10);
		stroke(255,255,0);
		noFill();
		ellipse(70,height/4,this.radius-20,this.radius-20);
		stroke(0,255,0);
		noFill();
		ellipse(70,height/4,this.radius-30,this.radius-30);
		stroke(0,0,255);
		noFill();
		ellipse(70,height/4,this.radius-40,this.radius-40);
		stroke(75,0,130);
		noFill();
		ellipse(70,height/4,this.radius-50,this.radius-50);
		stroke(148,0,211);
		noFill();
		ellipse(70,height/4,this.radius-60,this.radius-60);
		*/
		stroke(0,0,0);
		strokeWeight(1 - this.radius/125);
		noFill();
		ellipse(this.x,this.y,this.radius,this.radius);
		this.radius+=1;
		noStroke();
		
		
  }

	
}