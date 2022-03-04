class Snake {
    constructor(context, moveSpeed = 4, color="#333", radius=10) {
        this.context = context
        this.moveSpeed = moveSpeed
        this.color=color
        this.radius=radius
        
        this.body = []
        this.velocity = [0,0]
        this.direction = ""
        
        this.body.push({ x: window.innerWidth/2, y: window.innerHeight/2 })
    }

    addTail() {
        let xOffset = 0, yOffset = 0
        switch(this.direction){
            case "Up":
                yOffset = 1
                break
            case "Down":
                yOffset = -1
                break
            case "Left":
                xOffset = 1
                break
            case "Right":
                xOffset = -1
                break
        }

        let newX = this.body[this.body.length-1].x + xOffset
        let newY = this.body[this.body.length-1].y + yOffset
        this.body.push({x: newX, y: newY})
    }

    drawSnake() {
        for(let segment of this.body){
            this.context.beginPath()
            this.context.arc(segment.x + this.radius, segment.y + this.radius, this.radius, 0, 2 * Math.PI)
            this.context.fillStyle = this.color
            this.context.fill()
        }
    }

    move() {
        for (let i = this.body.length-1; i > 0; i--) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }
        this.body[0].x += this.velocity[0] * this.moveSpeed
        this.body[0].y += this.velocity[1] * this.moveSpeed
    }

    updateDirection(key) {
        switch (key) {
            case "ArrowDown":
                if (this.direction !== "Up") {
                    this.direction="Down"
                    this.velocity = [0,1]
                }
                break
            case "ArrowUp":
                if (this.direction !== "Down") {
                    this.direction="Up"
                    this.velocity = [0,-1]
                }
                break
            case "ArrowRight":
                if (this.direction !== "Left") {
                    this.direction="Right"
                    this.velocity = [1,0]
                }
                break
            case "ArrowLeft":
                if (this.direction !== "Right") {
                    this.direction="Left"
                    this.velocity= [-1,0]
                }
                break
        }
    }
}

class Fruit {
    constructor(context, margin = 100, color="lightcoral", radius=10) {
        this.context = context
        this.color = color
        this.radius = radius
        this.x = randomIntFromInterval(0, window.innerWidth-margin)
        this.y = randomIntFromInterval(0, window.innerHeight-margin)
    }

    drawFruit(){
        this.context.beginPath()
        this.context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI)
        this.context.fillStyle = this.color
        this.context.fill()
    }
}

class SnakeGame {
    constructor(context, collisionRadius = 15) {
        this.context = context
        this.collisionRadius = collisionRadius
        this.snake = new Snake(context)
        this.fruit = new Fruit(context)
        this.runGame = false
    }

    start() {
        document.addEventListener('keydown', (event) => this.snake.updateDirection(event.key));
        this.runGame = true
        requestAnimationFrame(() => this.update())
    }

    reset() {
        document.removeEventListener('keydown', (event) => this.snake.updateDirection(event.key))
        this.runGame = false
        this.snake = new Snake(this.context)
    }

    update() {
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.fruit.drawFruit()
        this.snake.move()
        this.snake.drawSnake()
        this.checkCollision()

        if(this.runGame) {
            requestAnimationFrame(() => this.update())
        }
    }

    addFruit() {
        this.fruit = new Fruit(this.context)
    }

    checkCollision() {
        // with fruit
        if (Math.abs(this.snake.body[0].x - this.fruit.x) < this.collisionRadius && Math.abs(this.snake.body[0].y - this.fruit.y) < this.collisionRadius) {
            for(let i = 0; i<10;i++){
              this.snake.addTail()
            }
            this.addFruit()
            return
        }
        
        // with tail
        for (let i=1; i<this.snake.body.length-1; i++) {
          if (this.snake.body[0].x == this.snake.body[i].x && this.snake.body[0].y == this.snake.body[i].y) { 
            this.reset()
            setTimeout(() => this.start(), 300)
           }
        }
        
        // with wall
        if(this.snake.body[0].x > canvas.width || this.snake.body[0].x < 0 || this.snake.body[0].y > canvas.height || this.snake.body[0].y < 0 ){
            this.reset()
            setTimeout(() => this.start(), 300)
        }
    }
}

function randomIntFromInterval(min, max) { // min and max inclusive 
    return Math.floor(Math.random() * (max - min + 1) + min)
}