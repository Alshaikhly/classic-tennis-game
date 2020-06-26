const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
let ballX = 200;
let ballSpeedX = 15;

// colorRect is a function that takes the 5 parameters to draw a rect on canvas
const colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
// colorCirc draws the ball on canvas
const colorCirc = (centerX, centerY, radius, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
// creates the rectangles needed for the game
const gameArea = () => {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  colorRect(0,210,10,100, 'white');

  //drawing of the ball
  
  colorCirc(ballX,150,10, 'yellow');
}

// controls the movement of the ball
const movement = () => {
  ballX += ballSpeedX;
  if (ballX < 0) {
    ballSpeedX= -ballSpeedX;
  }
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
}

const callBoth = () => {
  gameArea()
  movement()
}
$(document).ready(function() {
  
  const framesPerSecond = 30;
  setInterval(callBoth, 1000/framesPerSecond);
})