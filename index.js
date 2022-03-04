// Switch context on button press
let mainCloseButton = document.getElementById("main-close-button")
let mainToggleButton = document.getElementById("main-toggle-button")
let mainContainer = document.getElementById("main-container")
let canvas = document.getElementById("snake-canvas")

let context = canvas.getContext("2d")
snakeGame = new SnakeGame(context)

window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }  
resizeCanvas();

// toggle canvas view
mainCloseButton.onclick = () => { 
  if(window.innerWidth > 1200){
    mainContainer.classList.add("d-none"); 
    mainToggleButton.classList.remove("d-none"); 
    canvas.classList.remove("d-none"); 
    snakeGame.start();
  }
}

mainToggleButton.onclick = () => { 
  mainContainer.classList.remove("d-none"); 
  mainToggleButton.classList.add("d-none"); 
  canvas.classList.add("d-none"); 
  snakeGame.reset();
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