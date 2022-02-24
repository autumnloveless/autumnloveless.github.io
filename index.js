// Switch context on button press
let mainCloseButton = document.getElementById("main-close-button")
let mainToggleButton = document.getElementById("main-toggle-button")
let mainContainer = document.getElementById("main-container")
let canvas = document.getElementById("snake-canvas")

// toggle canvas view
mainCloseButton.onclick = () => { 
  if(window.innerWidth > 1200){
    mainContainer.classList.add("d-none"); 
    mainToggleButton.classList.remove("d-none"); 
    canvas.classList.remove("d-none"); 
    startGame();
  }
}

mainToggleButton.onclick = () => { 
  mainContainer.classList.remove("d-none"); 
  mainToggleButton.classList.add("d-none"); 
  canvas.classList.add("d-none"); 
  stopGame();
}

// Snake Game
const moveSpeed = 4;
const snakeRadius = 10;
const snakeColor = "#333"
const fruitColor = "lightcoral"
const collisionRadius = 15
const fruitMargin = 100

let runGame = false
let context = canvas.getContext("2d")
let velocity = { x: 0, y: 0 }
let snakeHead = { x: window.innerWidth/2, y: window.innerHeight/2 }
let fruit = generatePoint(fruitMargin)
let tail = []
let direction = ""

function startGame() {
  document.addEventListener('keydown', setDirection);
  runGame = true
  requestAnimationFrame(update)
}

function stopGame() {
  document.removeEventListener('keydown', setDirection)
  runGame = false
  tail = []
  velocity = { x: 0, y: 0 }
  direction = ""
  snakeHead = { x: window.innerWidth/2, y: window.innerHeight/2 }
}

// runs every frame
function update() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  drawFruit()
  moveSnakeForward()
  drawSnake()
  checkCollision()

  if(runGame) {
    requestAnimationFrame(update)
  }
}

function drawFruit() {
  context.beginPath()
  context.arc(fruit.x + snakeRadius, fruit.y + snakeRadius, snakeRadius, 0, 2 * Math.PI)
  context.fillStyle = fruitColor
  context.fill()
}

function drawSnake() {
  context.beginPath()
  context.arc(snakeHead.x + snakeRadius, snakeHead.y + snakeRadius, snakeRadius, 0, 2 * Math.PI)
  context.fillStyle = snakeColor
  context.fill()

  for (let tailSegment of tail) {
    context.beginPath()
    context.arc(tailSegment.x + snakeRadius, tailSegment.y + snakeRadius, snakeRadius, 0, 2 * Math.PI)
    context.fillStyle = snakeColor
    context.fill()
  }
}

function addTailSegment() {
  tail.push(assignValues(snakeHead))
}

function addFruit() {
  fruit = generatePoint(fruitMargin)
}

function moveSnakeForward() {
  if(velocity.x == 0 && velocity.y == 0) { return }

  for (let i = tail.length-1; i > 0; i--) {
    tail[i] = assignValues(tail[i-1])
  }

  if(tail.length > 0){
    tail[0] = assignValues(snakeHead)
  }

  snakeHead.x += velocity.x
  snakeHead.y += velocity.y 
}

function setDirection(event) {
  switch (event.key) {
    case "ArrowDown":
      if (direction !== "Up") {
        direction="Down"
        velocity = { x: 0, y: moveSpeed }
      }
      break
    case "ArrowUp":
      if (direction !== "Down") {
        direction="Up"
        velocity = { x: 0, y: moveSpeed * -1 }
      }
      break
    case "ArrowRight":
      if (direction !== "Left") {
        direction="Right"
        velocity = { x: moveSpeed, y: 0 }
        ySpeed = 0
      }
      break
    case "ArrowLeft":
      if (direction !== "Right") {
        direction="Left"
        velocity = { x: moveSpeed * -1, y: 0 }
      }
      break
  }
}

//check snake's collision
function checkCollision() {
  if (Math.abs(snakeHead.x - fruit.x) < collisionRadius && Math.abs(snakeHead.y - fruit.y) < collisionRadius) {
      for(let i = 0; i<10;i++){
        addTailSegment()
      }
      addFruit()
      return
  }
  
  //with its own tail
  for (let tailSegment of tail) {
    if (snakeHead.x == tailSegment.x && snakeHead.y == tailSegment.y) { 
      stopGame()
      setTimeout(startGame, 300)
     }
  }
  
  // with wall
  if(snakeHead.x >= canvas.width){
    snakeHead.x = 0;
  } else if (snakeHead.x < 0) {
    snakeHead.x = canvas.width;
  } else if ( snakeHead.y >= canvas.height) {
    snakeHead.y = 0;
  } else if (snakeHead.y < 0) { 
    snakeHead.y = canvas.height;
  }
}


window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }  
resizeCanvas();

function generatePoint(margin) {
  let screenX = window.innerWidth-margin, screenY = window.innerHeight-margin
  return { x: randomIntFromInterval(0, screenX), y: randomIntFromInterval(0, screenY) }
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function assignValues(obj) {
  return { x: obj.x, y: obj.y }
}


console.log(`
                  |--__
                  |
                  X
         |-___   / \\       |--__
         |      =====      |
         X      | .:|      X
        / \\     | O |     / \\
       =====   |:  . |   =====
       |.: |__| .   : |__| :.|
       |  :|. :  ...   : |.  |
_   __W| .    .  ||| .      :|W__  -
__  W  WWWW______"""______WWWW   W -
  ___  ---    ____     ____----     
_    --    --__     -___        __-

Welcome to my site! 
If you can see this, good for you!

Want to collaborate on a project? Reach out!
https://www.linkedin.com/in/autumn-loveless/

Enjoy the site,
Autumn

P.S. try the button on the top right

`)