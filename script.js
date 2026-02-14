function startGame() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");


    const width = canvas.width;
    const height = canvas.height;
    const boxSize = 16;
    const gameSpeed = 80;

    let snake = [{ x: 4 * boxSize, y: 10 * boxSize }];

    let score = 0;
    const scoreDisplay = document.getElementById("score");

    let game;

    function drawBox(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, boxSize, boxSize);
    }

    function spawnFood(snake, position) {

        if (position === "Random") {
            let foodX, foodY;
            let isOnSnake;
            do {
                foodX = Math.floor(Math.random() * (width / boxSize)) * boxSize;
                foodY = Math.floor(Math.random() * (height / boxSize)) * boxSize;
                isOnSnake = snake.some(segment =>
                    segment.x === foodX && segment.y === foodY
                );
            } while (isOnSnake)
            return {
                x: foodX,
                y: foodY
            };
        } else {
            return {
                x: position.x,
                y: position.y
            }
        }
    }

    let food = spawnFood(snake, position = { x: snake[0].x + 7 * boxSize, y: snake[0].y });

    document.addEventListener("keydown", changeDirection);
    let directionQueue = [];
    let direction = "RIGHT";

    function changeDirection(e) {
        let lastDirection = directionQueue.length > 0
            ? directionQueue[directionQueue.length - 1]
            : direction;

        let newDirection;

        if (e.key === "ArrowLeft" || e.key === "q") {
            newDirection = "LEFT";
        }
        if (e.key === "ArrowUp" || e.key === "z") {
            newDirection = "UP";
        }
        if (e.key === "ArrowRight" || e.key === "d") {
            newDirection = "RIGHT";
        }
        if (e.key === "ArrowDown" || e.key === "s") {
            newDirection = "DOWN";
        }

        // Vérifier qu'on ne fait pas demi-tour
        if (
            (newDirection === "LEFT" && lastDirection !== "RIGHT") ||
            (newDirection === "RIGHT" && lastDirection !== "LEFT") ||
            (newDirection === "UP" && lastDirection !== "DOWN") ||
            (newDirection === "DOWN" && lastDirection !== "UP")
        ) {
            // Limiter la file à 2 directions max pour éviter les bugs
            if (directionQueue.length < 2) {
                directionQueue.push(newDirection);
            }
        }
    }
    function collisionWithBody(head, body) {
        for (let i = 0; i < body.length; i++) {
            if (head.x === body[i].x && head.y === body[i].y) {
                return true;
            }
        }
        return false
    }

    function drawGame() {
        ctx.clearRect(0, 0, width, height);
        drawBox(food.x, food.y, "#9c2fbd");

        if (directionQueue.length > 0) {
            direction = directionQueue.shift();
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= boxSize;
        if (direction === "RIGHT") snakeX += boxSize;
        if (direction === "UP") snakeY -= boxSize;
        if (direction === "DOWN") snakeY += boxSize;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            scoreDisplay.textContent = `Score : ${score}`;

            food = spawnFood(snake, position = "Random");
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (
            snakeX < 0 ||
            snakeX >= width ||
            snakeY < 0 ||
            snakeY >= height
        ) {
            clearInterval(game);
            alert(`Game Over ! Score : ${score}`);
            return;
        }

        if (collisionWithBody(newHead, snake)) {
            clearInterval(game);
            alert(`Game Over ! Score : ${score}`);
            return;
        }

        snake.unshift(newHead);

        for (let i = 0; i < snake.length; i++) {
            drawBox(snake[i].x, snake[i].y, "#1A1A40");
        }
    }
    game = setInterval(drawGame, gameSpeed);
}

startGame();