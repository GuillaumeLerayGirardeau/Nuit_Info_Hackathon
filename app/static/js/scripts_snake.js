const canvas = document.getElementById("snake_game");
const context = canvas.getContext('2d'); // pour dire que l'on va dessiner en 2D

let box = 20; // taille d'une case

let snake = []
snake[0] = { x: 10 * box, y: 10 * box } 
/*Initialisation de la tête, on dit qu'elle est au milieu horizontalement
et verticalement de notre canvas, 10 * 20 = 200px */

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    /* limite la nourriture à 300px max de distance et +1 evite que la nourriture
    soit collée en haut à gauche du canvas*/
}

let score = 0;
let direct;

document.addEventListener("keydown", direction);

function direction(event){
    let key = event.keyCode; // Va recuperer le code de la touche pressee sur le clavier
    if (key == 37 && direct != "RIGHT"){ // code 37 correspond à fleche de gauche
        direct = "LEFT";
    } else if (key == 38 && direct != "DOWN"){
        direct = "UP";
    } else if (key == 39 && direct != "LEFT"){
        direct = "RIGHT";
    } else if (key == 40 && direct != "UP"){
        direct = "DOWN";
    }
}

function draw(){
    context.clearRect(0, 0, 400, 400);

    for (let i = 0; i < snake.length; i++){
        context.fillStyle = (i == 0) ? "green" : "white" // Si c'est la tete du serpent on l'affiche en vert
        context.fillRect(snake[i].x, snake[i].y, box, box) // on définit l'emplacement de chaque partie du corps
        context.strokeStyle = 'red' // Met une bordure rouge
        context.strokeRect(snake[i].x, snake[i].y, box, box); // definit le contour et où il se trouve sur tout le corps
    }

    context.fillStyle = "Orange"
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x
    let snakeY = snake[0].y // recupere les coordonnees de la tete du snake
    if (direct == "LEFT") {snakeX -= box;}
    if (direct == "UP") {snakeY -= box;}
    if (direct == "RIGHT") {snakeX += box;}
    if (direct == "DOWN") {snakeY += box;}
    // Met a jour les coordonees du snake

    if (snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
        // Si le serpent mange, remet la nourriture a un endroit aleatoire
    } else {
        snake.pop()
    }
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeY < 0 || snakeX > 19 * box || snakeY > 19 * box || collision(newHead, snake)){
        clearInterval(snake_game);
        let over = document.getElementById('game_over');
        over.classList.remove('hidden')
        over.classList.add('game_over')
    }

    snake.unshift(newHead);

    context.fillStyle = "red"
    context.font = "30px Arial"
    context.fillText(score, 2 * box, 1.6 * box)
}

function collision(head, array){
    for(let j = 0; j < array.length; j++){
        if (head.x == array[j].x && head.y == array[j].y){ // si le snake rentre en collision avec son corps on return true
            return true;
        }
    }
    return false;
}

document.getElementById("restart").addEventListener("click", () => {
    clearInterval(snake_game);
    snake = [{ x: 10 * box, y: 10 * box }];
    score = 0;
    direct = null;
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    };
    snake_game = setInterval(draw, 100);
});

let snake_game = setInterval(draw, 100)
