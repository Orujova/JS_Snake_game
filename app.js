const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = 800;
const snakeSize = 20;
const sound = new Audio("./Sounds/apple.wav");
canvas.width = canvasSize;
canvas.height = canvasSize;
let vX = 20;
let vY = 0;
let score = 0;
let snake = [
  {
    x: 60,
    y: 20,
  },
  {
    x: 40,
    y: 20,
  },
  {
    x: 20,
    y: 20,
  },
];
let apple = {
  x: 60,
  y: 120,
};
const drawScore = () => {
  ctx.fillStyle = "#000";
  ctx.font = "40px Arial";
  ctx.fillText(`Score: ${score}`, canvasSize - 220, 40);
};
const drawApple = () => {
  ctx.fillStyle = "#574b90";
  ctx.fillRect(apple.x, apple.y, snakeSize, snakeSize);
};
const drawBoard = () => {
  ctx.fillStyle = "#feca57";
  ctx.fillRect(0, 0, canvasSize, canvasSize);
};
const drawSnake = () => {
  ctx.fillStyle = "#ee5253";
  snake.map((s) => {
    ctx.fillRect(s.x, s.y, snakeSize, snakeSize);
  });
};
const generateNewApple = () => {
  //   sound.play();
  score++;
  apple.x = Math.floor((Math.random() * canvasSize) / 20) * 20;
  apple.y = Math.floor((Math.random() * canvasSize) / 20) * 20;
};
const moveSnake = () => {
  let head = { x: snake[0].x + vX, y: snake[0].y + vY };
  if (head.x > canvasSize) {
    head.x = 0;
  }
  if (head.x < 0) {
    head.x = canvasSize;
  }
  if (head.y > canvasSize) {
    head.y = 0;
  }
  if (head.y < 0) {
    head.y = canvasSize;
  }
  if (head.y === apple.y && head.x === apple.x) {
    snake.push(apple);
    generateNewApple();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      console.log("GAME OVER");
      clearInterval(game);
    }
  }
  snake.unshift(head);
  snake.pop();
};
let game = setInterval(() => {
  drawBoard();
  moveSnake();
  drawApple();
  drawSnake();
  drawScore();
}, 1000 / 25);
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      if (vX === 20) {
        return;
      }
      vX = -20;
      vY = 0;
      break;
    case 38:
      if (vY === 20) {
        return;
      }
      vX = 0;
      vY = -20;
      break;
    case 39:
      if (vX === -20) {
        return;
      }
      vX = 20;
      vY = 0;
      break;
    case 40:
      if (vY === -20) {
        return;
      }
      vX = 0;
      vY = 20;
      break;
  }
});
//call bind apply
//https://medium.com/yaz%C4%B1l%C4%B1m-bilimi/javascript-call-apply-ve-bind-fonksiyonlar%C4%B1-3b0242fbc7dd
// <-   music name   ->    volume changer
// 00:05/03:45
