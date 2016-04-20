var pic = document.getElementById("vimg");
var b1 = document.getElementById("animate");
var b2 = document.getElementById("stop");
var b3 = document.getElementById("clear");
var id;

var drawC = function(){
	clear();
	var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	var x = Math.floor((Math.random() * 460) + 21);
	var y = Math.floor((Math.random() * 460) + 21)
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

b1.addEventListener("click",drawC);
b2.addEventListener("click",stop);
b3.addEventListener("click",clear);