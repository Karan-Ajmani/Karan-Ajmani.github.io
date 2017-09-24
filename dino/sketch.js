// Karandeep Ajmani
// Offline images downloaded from - http://apps.thecodepost.org/trex/trex.html
// p5.js inspiration - Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var cacti = new Array();
var roads = new Array();
var clouds = new Array();
var stopgame = 0;
var hiscore = 0;
var currentscore = 0;
var cloudImg;
var roadImg;
var cactiImg = new Array();
var dinoImg;
var numCacti = 10;
var sunrays = new Array();
var cactiarraystart = 0;
var roadarraystart = 0;

function preload() {
/*
	// Image source from the intraweb. Changed to local
  cloudImg = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAOCAQAAAD6HOaKAAAAU0lEQVR4XrWSsQkAQAgD3X9El/ELixQpJHCfdApnUCtXz7o49cgagaGPaq4rIwAP9s/C7R7UX3inJ0BDb6qWDC7ScOR/QWjRlFizuPwLtTLj+qkH6DjD2wLtikUAAAAASUVORK5CYII=");
  roadImg = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAMAgMAAAAPCKxBAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAALJJREFUeF7t1EEKAyEMhtEvMNm7sPfJEVyY+1+ltLgYAsrQCtWhbxEhQvgxIJtSZypxa/WGshgzKdbq/UihMFMlt3o/CspEYoihIMaAb6mCvM6C+BTAeyo+wN4yykV/6pVfkdLpVyI1hh7GJ6QunUoLEQlQglNP2nkQkeF8+ei9cLxMue1qxVRfk1Ej0s6AEGWfVOk0QUtnK5Xo0Lac6wpdtnQqB6VxomPaz+dgF1PaqqmeWJlz1jYUaSIAAAAASUVORK5CYII=")
  // Large
  cactiImg[0] = loadImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAMAAACJUtIoAAAACVBMVEX////39/dTU1OabbyfAAAAAXRSTlMAQObYZgAAAXhJREFUeF7t2NGqAjEMANGM///RlwvaYQndULuFPJgHUYaEI6IPhgNAOA8HZ+3U6384F5y1U6YzAZTWG+dZamnFEstBFtCKJZSHWMADLJ18z+JqpQeLdKoDC8siC5iFCQs4znIxB5B1t6F3lQWkL4N0JsF+u6GXJdbI+FKW+yWr3lhgCZ2VSag3Nlk/FnRkIRbasLCO0oulikMsvmGpeiGLZ1jOMgtIP5bODivYYUXEIVbwFCt4khVssRgsgidZwQaLd2A8m7MYLGTl4KeQQs2y4kMAMGGlmQViDIb5O6xZnnLD485dIBzqDSE1yyFdL4Iqu4XJqUUWl/NVAFSZq1P6a5aqbAUM2epQbBioWflUBABiUyhYyZoCBev8XyMAObDNOhOAfiyxmHU0YNlldGAphGjFCjA3YkUn1o/1Y3EkZFZ5isCC6NUgwDBn1RuXH96doNfAhDXfsIyJ2AnolcCVhay0kcYbW0HvCO8OwIcJ3GzkORpkFuUP/1Ec8FW1qJkAAAAASUVORK5CYII=")
  // Small
  cactiImg[1] = loadImage ( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAjCAMAAABRlI+PAAAADFBMVEX////////39/dTU1PhglcSAAAAAXRSTlMAQObYZgAAAPNJREFUeF7tlkEKwzAMBLXr//+5iQhU7gRRQkyhZI+DhwH74jhmO+oIJBVwURljuAXagG5QqkSgBLqg3JnxJ1Cb8SmQ3o6gpO85owGlOB4m2BNKJ11BSd01owGlOHkcIAuHkz6UNpPKgozPM54dADHjJuNhZiJxdQCQgZJeBczgCAAy3yhPJvcnmdC9mZwBIsQMFV5AkzHBNknFgcKM+oyDIFcfCAoy03m+jSMIcmoVZkKqSjr1fghyahRmoKRUHYLiSI1SMlCq5CDgX6BXmKkfn+oQ0KEyyrzoy8GbXJ9xrM/YjhUZgl9nnsyTCe9rgSRdV15CwRcIEu8GGQAAAABJRU5ErkJggg==")
  dinoImg = loadImage( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAAvAgMAAABiRrxWAAAADFBMVEX///9TU1P39/f///+TS9URAAAAAXRSTlMAQObYZgAAAPpJREFUeF7d0jFKRkEMhdGLMM307itNLALyVmHvJuzTDMjdn72E95PGFEZSmeoU4YMMgxhskvQec8YSVFX1NhGcS5ywtbmC8khcZeKq+ZWJ4F8Sr2+ZCErjkJFEfcjAc/6/BMlfcz6xHdhRthYzIZhIHMcTVY1scUUiAphK8CMSPUbieTBhvD9Lj0vyV4wklEGzHpciKGOJoBp7XDcFs4kWxxM7Ey3iZ8JbzASAvMS7XLOJHTTvEkEZSeQl7DMuwVyCasqK5+XzQRYLUJlMbPXjFcn3m8eKBSjWZMJwvGIOvViAzCbUj1VEDoqFOEQGE3SyInJQLOQMJL4B7enP1UbLXJQAAAAASUVORK5CYII=")
  */
  
  
  cloudImg = loadImage("img/cloud.png");
  roadImg = loadImage("img/road.png");
  dinoImg = loadImage("img/dinosaurs.png");
  cactiImg[0] = loadImage("img/cacti-large.png");
  cactiImg[1] = loadImage("img/cacti-small.png");
  
}

function setup() {
  var canvas = createCanvas(650, 400);
  canvas.parent('t-rex-game');
  //frameRate(60);
  d = new Dinosaur(dinoImg);
  cactiarraystart = 0;
  roadarraystart = 0;
    
  for (var i=0;i<100;i++){
	  roads[i] = new Road(i,roadImg);
  }
  stopgame = 0;
  currentscore = 0;
  
  createCacti();
  
  // Define random clouds
  // Define 10 cloud collections. A collection can be of size 1,2
  for (var i = 0; i < 10; i++){
	clouds[i] = new Cloud(i,Math.floor((Math.random() * 10) + 1)%2,cloudImg);  
  }
  
 
 }

function draw() {
  background(255,255,255);
  //switch dino imgs every 5 frames to give running impression
  if (frameCount%5 == 0) {
	  if ( d.imgCutX === 88 ) d.imgCutX = 132;
	  else if ( d.imgCutX === 132 ) d.imgCutX = 88;
  }
  d.show();
 
  /* silly stuff */
  // Sun
  fill(69,70,71);
  noStroke();
  ellipse(70,height/4,30,30);
  
  //Sunrays
  if (frameCount%30 == 0)
  createSunRays();
  if  (sunrays[0] != undefined) {
	  if (sunrays[0].radius >= sunrays[0].endRadius) sunrays.splice(0,1);
  }
  for (var i=0;i<sunrays.length;i++){
	  sunrays[i].show();
  }
  
  if (stopgame === 1){
	currentscore = 0;
	console.log("Game Over");
	noLoop();
  }
  if (frameCount%5 == 0)
  currentscore +=1;
  
   for (var i=roadarraystart;i<roads.length;i++){
	   if (roads[i].start + 600 < 0){
		   roadarraystart++;
		   continue;
	   }
	  roads[i].show();
	  
	}
  textSize(12);
  fill(71,72,73);
  text("HI", width - 100, height/2);
  text(hiscore, width - 70, height/2);
  text(currentscore, width - 30, height/2);
  text("Press SPACE to jump and restart", width - 200, height/2 - 25);
  textSize(7);
  text("Karandeep Ajmani", width - 65, height);
  fill(255);
  
  /*
  if (cacti[0].x + cacti[0].width <0){
	  cacti.splice(0,1);
  }
  
  if (cacti.length === 0){
	  createCacti();
  }
  */  
  
  for (var i = cactiarraystart; i<cacti.length; i++){
	if (cacti[i].x + cacti[i].width < 0){
		  cactiarraystart++;
		  continue;
	}
	cacti[i].show();
	// Check if cactus hits dinosaur 
	if (d.x + d.imgWidth > cacti[i].x && d.x < cacti[i].x + cacti[i].width){
	// height - (road height) - (cacti height)
		if ( d.y + floor(d.imgHeight/2) > height -15-cacti[i].height  ){
			hiscore = Math.max(hiscore,currentscore);
			d.imgCutX = 176;
			stopgame = 1;
			}
	}	
  }
  
  for (var i = 0; i < 10; i++){
	clouds[i].show();  
  }
   

}


function createCacti(){

   // Define 100 cacti objects.
  for (var i = 0; i < 1000; i++){
	// Surely a better way to do this
	var cactiIndex = Math.floor((Math.random() * 10) + 1)%2;
	var imgCutX;
	var w;
	var h;
	var cactusImg = cactiImg[cactiIndex];
		
	// Large cacti image 175*50
	if ( cactiIndex  === 0 ) {
		imgCutX = Math.floor((Math.random() * 10) + 1)%2 * 75;
		w = 75;
		h = 50;
	}
	else{
	// Small cacti image 102*35
		h = 35;
		var numCacti = Math.floor((Math.random() * 10) + 1)%4;
		if (numCacti === 0){
			w = 17;
			imgCutX = Math.floor((Math.random() * 10) + 1)%5 * 17;
		}
		else if (numCacti === 1){
			w = 34;
			imgCutX = Math.floor((Math.random() * 10) + 1)%4 * 17;
		}
		else if (numCacti === 2){
			w = 51;
			imgCutX = Math.floor((Math.random() * 10) + 1)%3 * 17;
		}
		else if (numCacti === 3){
			w = 68;
			imgCutX = Math.floor((Math.random() * 10) + 1)%2 * 17;
		}
	}

	cacti[i] = new Cacti(i,imgCutX,w,h,cactusImg);
	
  }
	
	
}



function createSunRays(){
	sunrays.push(new SunRay());
}


function keyPressed() {
	if (keyCode === 32 && stopgame === 0){
		d.imgCutX = 0;
		// to prevent jump when dino in air
		if (d.midAir === 0) d.jump();
	}
	else if (keyCode === 32 && stopgame === 1){
		console.log("Starting New Game");
		setup();
		loop();
	}
}

