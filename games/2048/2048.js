import Grid from './Grid.js';
import Tile from './Tile.js';

export default function setup2048Input() { window.addEventListener("keydown", handleInput, { once: true }) }

const loseMessageDiv = document.querySelector('.game-2048-wrapper .game-over-message')
const highscoreDiv = document.querySelector('.game-2048-wrapper .highscore')
const currentScoreDiv = document.querySelector('.game-2048-wrapper .score')
let currentScore = 0
let highscore = localStorage.getItem('2048-highscore') || 0
window.addEventListener('2048_increase_score', increaseScore);
setScores()

const resetButton = document.querySelector('.game-2048-wrapper .reset-btn')
resetButton.onclick = resetGame

const gameBoard = document.getElementById("game-board")
let grid = new Grid(gameBoard)
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
        newTile.waitForTransition(true).then(() => loseGame())
        return
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
    loseMessageDiv.classList.remove('d-none')
}

function resetGame(event) {
    loseMessageDiv.classList.add('d-none')
    currentScore = 0
    setScores()
    grid = new Grid(gameBoard)
    grid.randomEmptyCell().tile = new Tile(gameBoard)
    grid.randomEmptyCell().tile = new Tile(gameBoard)
    setup2048Input()
}

function increaseScore(event) {
    currentScore += event.detail.scoreIncrease
    if(currentScore > highscore) { 
        highscore = currentScore
        localStorage.setItem('2048-highscore', highscore)
    }
    setScores()
}

function setScores() {
    currentScoreDiv.textContent = "Score: " + currentScore
    highscoreDiv.textContent = "Highscore: " + highscore
}