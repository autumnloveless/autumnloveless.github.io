import SnakeGame from './games/snake/snake.js'
import setup2048Input from './games/2048/2048.js'


// ================= Snake ========================
let snakeGame = new SnakeGame()
window.addEventListener('resize', () => snakeGame.reset(), false);
const snakeTab = document.getElementById("snake-tab")
snakeTab.addEventListener('shown.bs.tab', () => snakeGame.start())
snakeTab.addEventListener('hidden.bs.tab', () => snakeGame.stop())


// ================= 2048 =========================
setup2048Input()

// const _2048Tab = document.getElementById("game-2048-tab")
// _2048Tab.addEventListener('shown.bs.tab', () => console.log("showing 2048"))
// _2048Tab.addEventListener('hidden.bs.tab', () => console.log("hiding 2048"))

















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