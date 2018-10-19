ballX=400;
ballY=300;
var ballspeedX = 6;
var ballspeedY = 6;
var canvas;
var canvasContext;
var framespersec = 30;
var paddle1Y;
var paddle2Y=250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
var score1=8;
var score2=8;
var ais=2;
var dy;
var flag = 0;
var width = window.innerWidth;
var height = window.innerHeight;
window.onload = function () {
  console.log("Hello world");

  canvas = document.getElementById('game');
  canvasContext = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  setInterval(function() {
    moveEverything();
    drawEverything();
  },1000/framespersec);


  canvas.addEventListener('mousemove',function (evt) {
    var mousePos = calculatemouseposition(evt);
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
  })
}
function calculatemouseposition(evt) {
  var rect=canvas.getBoundingClientRect() ,root = document.documentElement;
  // account for margins, canvas postion on the page, scroll amount
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  }
}
function ballReset() {
  ballX=canvas.width/2;
  ballY=canvas.height/2;
  ballspeedX*=-1;
  ballspeedY=6;
}
function wincheck() {
  if (score2 === 10) {
    flag = 1
  }
  if(score1 === 10){
    flag = 2
  }
}
function pause() {
console.log("sdhfj");
}
function moveEverything() {
  ballX	+= ballspeedX;
  ballY += ballspeedY;
  // Left horizontal bouncing
  if (ballX<0) {
    if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
      ballspeedX*=-1;
      dy=ballY-(paddle1Y+PADDLE_HEIGHT/2);
      ballspeedY=dy*0.3;
    }else {
      score2+=1;
      ballReset();
      wincheck();
    }
  }
  //Right horizontal bouncing
  if (ballX>canvas.width) {
    if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT){
      ballspeedX*=-1;
      dy=ballY-(paddle2Y+PADDLE_HEIGHT/2);
      ballspeedY=dy*0.3;
    }else {
      score1+=1;
      ballReset();
      wincheck();
    }
  }
  //vertical bouncing
  if(ballY>canvas.height){
    ballspeedY *= -1;
  }
  else if (ballY<0) {
    ballspeedY *=-1;
  }
  //Right Paddle AI
  if (ballspeedX<0) {
    return 0;
  }
  else if (ballspeedX>0) {
    if (ballY>paddle2Y+(PADDLE_HEIGHT/2)) {
      paddle2Y+=ais;
    }
    else {
      paddle2Y-=ais;
    }
  }

}
function colorRect(topleftX,topleftY,boxwidth,boxheight,fillcolor) {
  //draw a black rectangle
  canvasContext.fillStyle = fillcolor;
  canvasContext.fillRect(topleftX,topleftY,boxwidth,boxheight);
}
function colorCircle(centerX,centerY,radius,fillcolor){
  canvasContext.fillStyle = fillcolor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}
function drawEverything()	{
  if(width>500){
    canvas.width = 800;
    canvas.height = 600;
  }

  if(flag === 1){
    colorRect(0,	0,	canvas.width,	canvas.height,	'black');
    canvasContext.fillStyle = 'white';
    canvasContext.font="30px Arial"
    canvasContext.fillText("Player 2 is Winner",canvas.width/2,canvas.height/2);
    cancelAnimationFrame();
  }
  else if(flag === 2){
    colorRect(0,	0,	canvas.width,	canvas.height,	'black');
    canvasContext.fillStyle = 'white';
    canvasContext.font="30px Arial"
    canvasContext.fillText("Player 1 is Winner",canvas.width/2,canvas.height/2);

    document.addEventListener('keydown',function(e){
      if(e.keyCode == 13){
        location.reload();
      }
    })
    window.cancelAnimationFrame();
  }
  else{
    //	clear	the	game	view	by	filling	it	with	black
    colorRect(0,	0,	canvas.width,	canvas.height,	'black');
    //	draw	the	ball
    colorCircle(ballX,	ballY,	10,	'white');
    //	draw	a	white	rectangle	to	use	as	the	left	player's	paddle
    colorRect(0,	paddle1Y,	PADDLE_WIDTH,	100,	'red');
    //	draw	a	white	rectangle	to	use	as	the	right	player's	paddle
    colorRect(canvas.width-10,	paddle2Y,	PADDLE_WIDTH,	100,	'red');
    //score
    canvasContext.font="30px Arial"
    canvasContext.fillStyle="White"
    canvasContext.fillText("Score:"+score1 , 100,100);
    canvasContext.font="30px Arial"
    canvasContext.fillText("Score:"+score2 , canvas.width-200,100);
  }

}
