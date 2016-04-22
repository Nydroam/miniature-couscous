var pic = document.getElementById("vimg");
var b1 = document.getElementById("add");
var b2 = document.getElementById("remove");
var b3 = document.getElementById("add3");
var ballList = [];
var colors = ["honeydew", "skyblue", "plum", "tan", "cornsilk", "brown", "dodgerblue"];

var svgx = 800;
var svgy = 600;

var dist = function(a,b,c,d) {
    return Math.sqrt((a-b)*(a-b) + (c-d)*(c-d));
}
var Ball = function(){
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    var r = Math.floor((Math.random() * 35)  + 15);
    var x = Math.floor((Math.random() * (svgx - 2*r)) + r + 3);
    var y = Math.floor((Math.random() * (svgy - 2*r)) + r + 3);

    var colliding = function( other ){
        return dist(x, other.x(), y, other.y()) < r + other.r;
    }

    var check = true;

    while(check) {
	check = false;
	var x = Math.floor((Math.random() * (svgx - 2*r)) + r + 3);
	var y = Math.floor((Math.random() * (svgy - 2*r)) + r + 3);
	for (var i = 0; i < ballList.length; i++) {
	    if (colliding(ballList[i])) {
		console.log("whoa");
		check = true;
	    }
	}
    }
    
    
    var dx = Math.random()*2;
    var dy = Math.random()*2;

    c.setAttribute( "cx", x );
    c.setAttribute( "cy", y );
    c.setAttribute( "r", r );
    c.setAttribute( "fill", colors[Math.floor(Math.random() * colors.length)] );
    c.setAttribute( "stroke", "black" );

    pic.appendChild(c);
    var inc = function(){
	x += dx;
	y += dy;
	if((x+r >= svgx && dx > 0) || (x <= r && dx < 0))
	    dx *= -1;
	if((y+r >= svgy && dy > 0) || (y <= r && dy < 0))
	    dy *= -1;
	c.setAttribute( "cx", x );
	c.setAttribute( "cy", y );
    }
    
    var getdx = function(){
        return dx;
    }
    var getdy = function(){
        return dy;
    }
    var getx = function(){
        return x;
    }
    var gety = function(){
        return y;
    }
    var setVel = function (Dx,Dy){
        dx = Dx;
        dy = Dy;
    }
    var resolveCollision = function( other ){
        //console.log("colliding");
        //console.log((other.dx()*(other.r-r)+2*r*dx)/(r+other.r) + ", " +
        //(other.dy()*(other.r-r)+2*r*dy)/(r+other.r));
        //console.log((dx*(r-other.r)+2*other.r*other.dx())/(r+other.r)
        //+ ", " + (dy*(r-other.r)+2*other.r*other.dy())/(r+other.r));
        var tmpx = dx;
        var tmpy = dy;
        setVel((dx*(r-other.r)+2*other.r*other.dx())/(r+other.r),
	       (dy*(r-other.r)+2*other.r*other.dy())/(r+other.r));
        other.setVel((other.dx()*(other.r-r)+2*r*tmpx)/(r+other.r),
		     (other.dy()*(other.r-r)+2*r*tmpy)/(r+other.r));
        //console.log(dx + ", " + dy);
        //console.log(other.dx() + ", " + other.dy());
        while(dist(x, other.x(), y, other.y()) < r + other.r - 15){
	    inc();
	    other.inc();
        }
        inc();
        other.inc();
    }
    return {
        inc: inc,
        colliding: colliding,
        resolveCollision: resolveCollision,
        setVel: setVel,
        dx: getdx,
        dy: getdy,
	x: getx,
	y: gety,
	r: r,
        c: c
    }
}

var n;
var m;
var addBall = function(){
    var b = Ball();
    ballList.push(b);
    //setInterval(b.inc,16);
    //var g = setInterval(b.update,16);
    //b.setInt(g);
    //console.log(g);
}

var add3Balls = function(){
    addBall();
    addBall();
    addBall();
}


var move = function(){
    for(n = 0; n < ballList.length; n++)
	ballList[n].inc();
}
var col = function(){
    for(n = 0; n < ballList.length; n++){
	for (m = n + 1; m < ballList.length; m++){
	    if(ballList[n].colliding(ballList[m]))
		ballList[n].resolveCollision(ballList[m]);
	}
    }
}

setInterval(move, 8);
setInterval(col, 5);

var removeBall = function(){
    var c = document.getElementsByTagName("circle");
    if(c[0]){
	ballList.shift();
	//clearInterval(ballList.shift().interval());
	c[0].remove();
    }
    //console.log(ballList);
}

var i;
for(i = 0; i < 10; i++){
    addBall();
}

b1.addEventListener("click", addBall);
b2.addEventListener("click", removeBall);
b3.addEventListener("click", add3Balls);
