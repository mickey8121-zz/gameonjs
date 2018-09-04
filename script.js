
 var canvas = document.getElementById("canvas")
     ctx = canvas.getContext("2d")
     x = canvas.width
     x2 = canvas.width/2
     y = canvas.height
     y2 = canvas.height-30
     dx = 4
     dy = -4
     ballRadius = 20
     paddleheight = 15
     paddleWidth = 180
     paddleX = (canvas.width - paddleWidth)/2
     rightPressed = false
     leftPressed = false
     brickRowCount = 4
     brickColumnCount = 7
     brickWidth = 150
     brickHeight = 30
     brickPadding = 30
     brickOffsetTop = 30
     brickOffsetLeft = 30
     score = 0
     colorBall = "#000"
     colorBricks = "#000"
     colorPaddle = "#000"

     bricks = []
     for(var c=0; c<brickColumnCount; c++) {
       bricks[c] = [];
       for(var r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1};
       }
     }

 document.addEventListener("keydown", keyDownHandler, false);
 document.addEventListener("keyup", keyUpHandler, false);
 document.addEventListener("mousemove", mouseMoveHandler, false);

 function drawBricks() {
   for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x2 = brickX;
                bricks[c][r].y2 = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colorBricks;
                ctx.fill();
                ctx.closePath();
            }
        };
      }
    }

 function collisionDetection() {
   for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x2 > b.x2 - 5 && x2 < b.x2+brickWidth + 5 && y2 > b.y2 - 5 && y2 < b.y2+brickHeight + 5) {
                    colorBall = randomColor();
                    colorPaddle = colorBall;
                    colorBricks = randomColor();
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount) {
                      alert("You WIN!");
                      document.location.reload();
                    }
                }
            }
        }
    }
 }

 function drawScore() {
   ctx.font = "15px Ariel";
   ctx.fillStyle = "black";
   ctx.fillText("Score: " + score, 8, 20);
 }

 function drawBall() {
     ctx.beginPath();
     ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
     ctx.fillStyle = colorBall;
     ctx.fill();
     ctx.closePath();
 }

 function draw() {
   ctx.clearRect(0, 0, x, y);
   drawBricks();
   drawBall();
   drawPaddle();
   collisionDetection();
   drawScore();
   x2 += dx;
   y2 += dy;

   if(y2 + dy < ballRadius){
     dy = -dy;
   }
   else if (y2 + dy > canvas.height - 20) {
     if (x2 > paddleX-10 && x2 < paddleX+10 + paddleWidth) {
       dy = -dy
     }
     else {
       alert("GameOver!");
       document.location.reload();
     }
   }

   if(x2 + dx > canvas.width-ballRadius || x2 + dx < ballRadius){
     dx = -dx;
   }

   if (rightPressed == true && paddleX < canvas.width - paddleWidth) {
     paddleX += 8;
   }
   else if (leftPressed == true && paddleX > 0) {
     paddleX -= 8;
   }
 }

 function drawPaddle() {
   ctx.beginPath();
   ctx.rect(paddleX, canvas.height - paddleheight, paddleWidth, paddleheight);
   ctx.fillStyle = colorPaddle
   ctx.fill();
   ctx.closePath();
 }

 function keyDownHandler(e) {
   if(e.keyCode == 39) {
     rightPressed = true;
   }
   else if(e.keyCode == 37) {
     leftPressed = true;
    }
 }
 function keyUpHandler(e) {
   if(e.keyCode == 39) {
     rightPressed = false;
   }
   else if (e.keyCode == 37) {
     leftPressed = false;
   }
 }

 function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

 function randomColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

function start() {
  setInterval(draw, 10);
}
