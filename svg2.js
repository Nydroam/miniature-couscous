var pic = document.getElementById("vimg");
var b1 = document.getElementById("add");
var b2 = document.getElementById("remove");
var ballList = [];
var colors = ["honeydew", "skyblue", "plum", "tan", "cornsilk", "brown", "dodgerblue"];

/*
  var clear = function(){
  var c = document.getElementsByTagName("circle");
  if(c[0])
  c[0].remove();
  }

  var stop = function(){
  if(id)
  clearInterval(id);
  }
*/

var Ball = function(){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var r = Math.floor((Math.random() * 35)  + 15);
    var x = Math.floor((Math.random() * (500-2*r)) + r + 3);
    var y = Math.floor((Math.random() * (500-2*r)) + r + 3);
    var dx = Math.random()*3;
    var dy = Math.random()*3;
    c.setAttribute( "cx", x );
    c.setAttribute( "cy", y );
    c.setAttribute( "r", r );
    c.setAttribute( "fill", colors[Math.floor(Math.random() * colors.length)] );
    c.setAttribute( "stroke", "black" );

    pic.appendChild(c);
    var inc = function(){
 //   	console.log("inc-ing");
	x += dx;
	y += dy;
	if(x+r >= 500|| x <= r)
	    dx *= -1;
	if(y+r >= 500|| y <= r)
	    dy *= -1;
	c.setAttribute( "cx", x );
	c.setAttribute( "cy", y );
    }
    var dist = function(a,b,c,d) {
	return Math.sqrt((a-b)*(a-b) + (c-d)*(c-d))
    }
    var flip = function() {
	dx*=-1;
	dy*=-1;
    }
    var collide = function(){
	var i;
	for(i = 0; i < ballList.length; i++){
	    var other = ballList[i];
	    if (other.x == x && other.y == y && other.r == r){
	    }
	    else {
		if (dist(x, other.x, y, other.y) < r + other.r) {
		    flip();
		    inc();
		}
	    }
	}
    }
    return {
    	inc: inc,
	flip: flip,
	collide: collide,
	x: x,
	y: y,
	r: r
    }
}

var addBall = function(){
    //console.log("addball");
    var b = Ball();
    ballList.push(b);
    setInterval(b.inc,16);
    setInterval(b.collide,10);
}

var removeBall = function(){
  var c = document.getElementsByTagName("circle");
  if(c[0]){
      c[0].remove();
      ballList[0].remove();
  }
}

var i;
for(i = 0; i < 10; i++){
    addBall();
}

b1.addEventListener("click", addBall);
b2.addEventListener("click", removeBall);
