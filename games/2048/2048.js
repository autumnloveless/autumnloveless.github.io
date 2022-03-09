import Grid from './Grid.js';
import Tile from './Tile.js';

export default function setup2048Input() {
    window.addEventListener("keydown", handleInput, { once: true })
}

const gameBoard = document.getElementById("game-board")
const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)


function handleInput(e) {
    switch(e.key) {
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        default:
            return
    }

    // Other stuff
    setup2048Input()
}

function moveUp() {
    slideTiles(grid.cellsByColumn)
}
