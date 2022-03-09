import SnakeGame from './snake.js'
let snakeGame = new SnakeGame()

let tabEl = document.querySelector('button[data-bs-toggle="tab"]')
tabEl.addEventListener('shown.bs.tab', function (event) {
  if(event.relatedTarget?.id == "snake-tab") {
    snakeGame.reset();
    snakeGame.stop();
  }
})

tabEl.addEventListener('hidden.bs.tab', function (event) {
  if(event.relatedTarget?.id == "snake-tab") {
    snakeGame = new SnakeGame()
    snakeGame.start();
  }
})

window.addEventListener('resize', () => snakeGame.reset(), false);


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