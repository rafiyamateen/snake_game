const canvas = document.getElementById('snake'),
    context = canvas.getContext('2d');
function drawSnake(x, y) {
    context.fillStyle = "white";
    context.fillRect(x * 10, y * 10, 10, 10);
    context.strokeStyle = "black";
    context.strokeRect(x * 10, y * 10, 10, 10);
}
let snakeLength = 4,
    snake = [],
    score = 0;
for (let i = snakeLength; i > 0; i--) {
    snake.push({
        x: i,
        y: 0
    })
}
let dir = "right";
document.addEventListener('keydown', direction);
function direction(event) {
    if (event.keyCode == 37 && dir != "right") {
        dir = "left";
    }
    else if (event.keyCode == 38 && dir != "down") {
        dir = "up";
    }
    else if (event.keyCode == 39 && dir != "left") {
        dir = "right";
    }
    else if (event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}
let food = {
    x: Math.floor(Math.random() * 59 + 1),
    y: Math.floor(Math.random() * 54 + 1)
}
function drawFood(x, y) {
    context.fillStyle = "red";
    context.fillRect(x * 10, y * 10, 10, 10);
    context.strokeStyle = "rgb(68, 146, 23)";
    context.strokeRect(x * 10, y * 10, 10, 10);
}
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        let X = snake[i].x;
        let Y = snake[i].y;
        drawSnake(X, Y);
    }
    drawFood(food.x, food.y);
    let snakeX = snake[0].x,
        snakeY = snake[0].y;

    function collision(newHead, snake) {

        for (let i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                return true;
            }
        }
        return false;
    }
    if (dir == "left") {
        snakeX--;
    }
    else if (dir == "up") {
        snakeY--;
    }
    else if (dir == "right") {
        snakeX++;
    }
    else if (dir == "down") {
        snakeY++;
    }
    let newHead;
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * 59 + 1),
            y: Math.floor(Math.random() * 59 + 1)
        }
        newHead = {
            x: snakeX,
            y: snakeY
        }
        score++;
        document.getElementsByTagName('span')[0].innerHTML = score;
    }
    else {
        snake.pop();
        newHead = {
            x: snakeX,
            y: snakeY
        }
    }
    if (snakeX < 0 || snakeY < 0 || snakeX >= 60 || snakeY >= 55 || collision(newHead, snake)) {
        clearInterval(game);
        document.getElementById('over').style.display='block';
    }
    snake.unshift(newHead);
}
let game = setInterval(draw, 100);
document.getElementsByTagName('button')[0].onclick=()=>{
    clearInterval(game);
}
document.getElementsByTagName('button')[1].onclick=()=>{
location.reload();
}