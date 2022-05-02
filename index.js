// import SnakeGame from './games/snake/snake.js'
// import setup2048Input from './games/2048/2048.js'
import lorenzViewer from './games/lorenz/lorenz.js'
import rosslerViewer from './games/rossler/rossler.js'


// ================ Home ========================
const backgroundDiv = document.querySelector('.contact-card')
const homeTab = document.getElementById("home-tab")
homeTab.addEventListener('shown.bs.tab', () => backgroundDiv.style.backgroundImage = "url(../images/background-image.jpg)")
homeTab.addEventListener('hidden.bs.tab', () => backgroundDiv.style.backgroundImage = "none")

// ================= Snake ========================
// let snakeGame = new SnakeGame()
// window.addEventListener('resize', () => snakeGame.reset());
// const snakeTab = document.getElementById("snake-tab")
// snakeTab.addEventListener('shown.bs.tab', () => {
//   SnakeGame.resizeCanvas()
//   snakeGame.start()
// })
// snakeTab.addEventListener('hidden.bs.tab', () => snakeGame.stop())


// ================= 2048 =========================
// const game2048Tab = document.getElementById("game-2048-tab")
// game2048Tab.addEventListener('shown.bs.tab', () => setup2048Input())

// ================ Lorenz =======================
const lorenzTab = document.getElementById("lorenz-tab")
let lorenzP5 = new p5(lorenzViewer, 'lorenz-wrapper')
lorenzP5.noLoop()

lorenzTab.addEventListener('shown.bs.tab', () =>  lorenzP5.loop())
lorenzTab.addEventListener('hidden.bs.tab', () => lorenzP5.noLoop())


// ============== Rossler ===========================
const rosslerTab = document.getElementById("rossler-tab")
let rosslerP5 = new p5(rosslerViewer, 'rossler-wrapper')
rosslerP5.noLoop()

rosslerTab.addEventListener('shown.bs.tab', () =>  rosslerP5.loop())
rosslerTab.addEventListener('hidden.bs.tab', () => rosslerP5.noLoop())

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