const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
let ballX = 250; // location of the ball in px on the x-axis over the canvas element(counting from the left edge of canvas)
let ballY = 250; // same as X but on the y-axis
let ballSpeedX = 10; // the ball moves 10 px on the x-axis with every time interval >> setInterval.
let ballSpeedY = 4; // same as X on the y-axis
let paddle1Y = 250;
let paddle2Y = 250;
const paddleThickness = 10;
const paddleHeight = 100;
let player1Score = 0;
let player2Score = 0;
const winningScore = 2;
let showingWinScreen = false;

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

const drawNet = () => {
  for (let i = 0; i <canvas.height; i+=40) {
    colorRect(canvas.width/2-1, i,2,20,'white')
  }
}
// function to reset the ball in the ventre of canvas

const ballReset = () => {
  if (player1Score >= winningScore || player2Score >= winningScore) { // check if winning condition is reached then do this to reset the game
    showingWinScreen = true;
  }
  ballSpeedX = - ballSpeedX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}

// function to track mouse movement on the canvas

const calculateMousePos = evt => {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };
};

const computerMovement = () => {
  const paddle2YCenter = paddle2Y + paddleHeight/2;
  if (paddle2YCenter < ballY -35) {
    paddle2Y += 8;
  } else if (paddle2YCenter > ballY +35) {
    paddle2Y -= 8;
  }
}
// creates the rectangles needed for the game
const gameArea = () => {
  // drawing the canvas
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  if (showingWinScreen) {
    canvasContext.fillStyle = 'white';
    if (player1Score >= winningScore) {
      canvasContext.fillText("🎾🎾🎾Player 1 won!!🎾🎾🎾", 300, 200);
    } else if (player2Score >= winningScore) {
      canvasContext.fillText("🎾🎾🎾Computer won!!🎾🎾🎾", 300, 200);
    }
    canvasContext.fillText("click anywhere to play again", 320, 450);
    return; // this is just to bail out of the function early
  }

  drawNet()
  // drawing the paddles
  colorRect(0,paddle1Y, paddleThickness, paddleHeight, 'white');
  colorRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, 'white');

  //drawing of the ball
  colorCirc(ballX, ballY, 10, 'yellow');

  // add score to the screen
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

// controls the movement of the ball
const movement = () => {
  if (showingWinScreen) {
    return; // this is just to bail out of the function early
  }
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < paddleThickness) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      let deltaY1 = ballY - (paddle1Y + paddleHeight/2)
      ballSpeedY = deltaY1 * 0.35
    } else {
      player2Score++; // MUST be before ballreset to check if the score needs to end the game
      ballReset();
    }
  }
  if (ballX > canvas.width - paddleThickness) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX= -ballSpeedX;
      let deltaY2 = ballY - (paddle2Y + paddleHeight/2)
      ballSpeedY = deltaY2 * 0.35
    } else {
      player1Score++;
      ballReset(); 
    }
  }
  if (ballY < 0) {
    ballSpeedY= -ballSpeedY;
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

const callBoth = () => {
  gameArea();
  movement();
  computerMovement();
};

const handleMouseClick = evt => {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false
  }
}
$(document).ready(function() {
  
  const framesPerSecond = 30;
  setInterval(callBoth, 1000/framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);
  
  canvas.addEventListener('mousemove', 
    function(evt) {
      let mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y - paddleHeight/2;
    });

})