import Grid from './Grid.js';
import Tile from './Tile.js';

export default function setup2048Input() {
    window.addEventListener("keydown", handleInput, { once: true })
}

const gameBoard = document.getElementById("game-board")
const grid = new Grid(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

async function handleInput(e) {
    switch(e.key) {
        case "ArrowUp":
            if (!canMoveUp()) {
                setup2048Input()
                return
            }
            await moveUp()
            break
        case "ArrowDown":
            if (!canMoveDown()) {
                setup2048Input()
                return
            }
            await moveDown()
            break
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setup2048Input()
                return
            }
            await moveLeft()
            break
        case "ArrowRight":
            if (!canMoveRight()) {
                setup2048Input()
                return
            }
            await moveRight()
            break
        default:
            return
    }

    grid.cells.forEach(cell => cell.mergeTiles())
    const newTile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = newTile

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        console.log("can't move!")
        newTile.waitForTransition(true).then(() => loseGame())
        return
    } else {
        console.log("can move")
    }

    setup2048Input()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}
function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()))
}
function moveLeft() {
    return slideTiles(grid.cellsByRow)
}
function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for(let i = 1; i < group.length; i++){
                const cell = group[i]
                if (cell.tile == null) continue
                let lastValidCell
                // check if this tile can be moved
                for (let j = i-1; j >= 0; j--){
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }

                // move or merge tile
                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile
                    } else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }
            return promises
        })
    )
}

function canMoveUp() {
    return canMove(grid.cellsByColumn)
}
function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}
function canMoveLeft() {
    return canMove(grid.cellsByRow)
}
function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group => {
        return group.some((cell,index) => {
            // if top or empty -> return false
            if(index === 0) return false
            if(cell.tile == null) return false
            const moveToCell = group[index-1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}

function loseGame() {
    
}