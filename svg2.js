var pic = document.getElementById("vimg");
var b1 = document.getElementById("add");

/*var drawC = function(){
	clear();
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	var x = Math.floor((Math.random() * 460) + 21);
	var y = Math.floor((Math.random() * 460) + 21);
	c.setAttribute( "cx", x );
	c.setAttribute( "cy", y );
	c.setAttribute( "r", 20 );
	c.setAttribute( "fill", "red" );
	c.setAttribute( "stroke", "black" );
	
	pic.appendChild( c );
	
	var dx = 1;
	var dy = 1;

	var anim = function(){
		if(x+20>=500||x<=20)
			dx *= -1;
		if(y+20>=500||y<=20)
			dy *= -1;

		x+=dx;
		y+=dy;

		c.setAttribute( "cx", x );
		c.setAttribute( "cy", y );
	}
	
	id = setInterval(anim, 16);	
};

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
	var x = Math.floor((Math.random() * 460) + 21);
	var y = Math.floor((Math.random() * 460) + 21);
	var dx = 1;
	var dy = 1;
	c.setAttribute( "cx", x );
	c.setAttribute( "cy", y );
	c.setAttribute( "r", 20 );
	c.setAttribute( "fill", "red" );
	c.setAttribute( "stroke", "black" );

	pic.appendChild(c);
    var inc = function(){
    	console.log("inc-ing");
	x += dx;
	y += dy;
	if(x+20>=500||x<=20)
	    dx *= -1;
	if(y+20>=500||y<=20)
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
b1.addEventListener("click",addBall);
