import SnakeGame from './games/snake/snake.js'
import setup2048Input from './games/2048/2048.js'
import lorenzViewer from './games/lorenz/lorenz.js'

// ================= Snake ========================
let snakeGame = new SnakeGame()
window.addEventListener('resize', () => snakeGame.reset(), false);
const snakeTab = document.getElementById("snake-tab")
snakeTab.addEventListener('shown.bs.tab', () => snakeGame.start())
snakeTab.addEventListener('hidden.bs.tab', () => snakeGame.stop())


// ================= 2048 =========================
const game2048Tab = document.getElementById("game-2048-tab")
game2048Tab.addEventListener('shown.bs.tab', () => setup2048Input())

// ================ Lorenz =======================
let lorenzP5 = new p5(lorenzViewer, 'lorenz-wrapper')
lorenzP5.noLoop()
let wrapperDiv = document.querySelector(".contact-card-body.tab-content")
const lorenzTab = document.getElementById("lorenz-tab")
lorenzTab.addEventListener('shown.bs.tab', () =>  { 
  lorenzP5.loop()
  lorenzP5.resizeCanvas(wrapperDiv.clientWidth, wrapperDiv.clientHeight)
})
lorenzTab.addEventListener('hidden.bs.tab', () => lorenzP5.noLoop())
window.addEventListener('resize', () => lorenzP5.resizeCanvas(wrapperDiv.clientWidth, wrapperDiv.clientHeight), false);

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

`)