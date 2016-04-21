var pic = document.getElementById("vimg");
var b1 = document.getElementById("add");

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
    var x = Math.floor((Math.random() * (500-2*r)) + r + 1);
    var y = Math.floor((Math.random() * (500-2*r)) + r + 1);
    var dx = Math.random()*3;
    var dy = Math.random()*3;
    c.setAttribute( "cx", x );
    c.setAttribute( "cy", y );
    c.setAttribute( "r", r );
    c.setAttribute( "fill", colors[Math.floor(Math.random() * colors.length)] );
    c.setAttribute( "stroke", "black" );

    pic.appendChild(c);
    var inc = function(){
    	console.log("inc-ing");
	x += dx;
	y += dy;
	if(x+r >= 500|| x <= r)
	    dx *= -1;
	if(y+r >= 500|| y <= r)
	    dy *= -1;
	c.setAttribute( "cx", x );
	c.setAttribute( "cy", y );
    }
    return {
    	inc: inc
    }
}

var addBall = function(){
    //console.log("addball");
    var b = Ball();
    setInterval(b.inc,16);
}

var removeBall = function(){

}

var i;
for(i = 0; i < 10; i++){
    addBall();
}
b1.addEventListener("click",addBall);
