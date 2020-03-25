const canvas = document.getElementById('snake'),
    context = canvas.getContext('2d');
function snakeFn(x, y) {
    context.fillStyle = "white";
    context.fillRect(x * 10, y * 10, 10, 10);
    context.strokeStyle = "black";
    context.strokeRect(x * 10, y * 10, 10, 10);
}
let snakeLength = 4,
    snake = [],
    score = 0;
for (let i = snakeLength - 1; i >= 0; i--) {
    snake.push({
        x: i,
        y: 0
    })
}
let dir = "right";
if (screen.width < 600) {
    let arrows = document.querySelectorAll('.fas');
    for (let i = 0; i < arrows.length; i++) {
        arrows[i].style.display = 'inline-block';
    }
    document.getElementById('up').addEventListener('click', () => { if (dir != 'down') { dir = 'up' } });
    document.getElementById('left').addEventListener('click', () => { if (dir != 'right') { dir = 'left' } });
    document.getElementById('right').addEventListener('click', () => { if (dir != 'left') { dir = 'right' } });
    document.getElementById('down').addEventListener('click', () => { if (dir != 'up') { dir = 'down' } });
}
document.addEventListener('keydown', dirFn);
function dirFn(event) {
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
    x: Math.floor(Math.random() * (canvas.width / 10 - 1) + 1),
    y: Math.floor(Math.random() * (canvas.height / 10 - 1) + 1)
}
function foodFn(x, y) {
    context.fillStyle = "red";
    context.fillRect(x * 10, y * 10, 10, 10);
    context.strokeStyle = "rgb(68, 146, 23)";
    context.strokeRect(x * 10, y * 10, 10, 10);
}
let sound = document.getElementById('game');
function start() {
    sound.play();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        let X = snake[i].x,
            Y = snake[i].y;
        snakeFn(X, Y);
    }
    foodFn(food.x, food.y);
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
        let eat = document.getElementById('eat');
        eat.play();
        food = {
            x: Math.floor(Math.random() * (canvas.width / 10 - 1) + 1),
            y: Math.floor(Math.random() * (canvas.height / 10 - 1) + 1)
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
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / 10 || snakeY >= canvas.height / 10 || collision(newHead, snake)) {
        sound.pause();
        clearInterval(game);
        let over = document.getElementById('gameOver');
        over.play();
        document.getElementById('over').style.display = 'block';
    }
    snake.unshift(newHead);
}
let game = setInterval(start, 100);
document.getElementsByTagName('button')[0].onclick = () => {
    sound.pause();
    clearInterval(game);
}
document.getElementsByTagName('button')[1].onclick = () => {
    location.reload();
}