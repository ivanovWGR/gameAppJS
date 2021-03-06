const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const arena = createMatrix(12, 20);
const player = {
    pos: { x: 0, y: 0 },
    matrix: null,
    score: 0,
    bestScore: 0,
}

context.scale(20, 20);

let dropCounter = 0;
let dropInterval = 400;
let lastTime = 0;

function createMatrix(w, h) {
    const matrix = [];

    while (h--) {
        matrix.push(new Array(w).fill(0))
    }
    return matrix
}

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
     player.score+=15;
    if (player.bestScore < player.score) {
        player.bestScore = player.score;
    }
    console.log(player.bestScore,player.score)
    document.getElementById('Score').innerHTML =
        `Score:(${player.score}) Record:(${player.bestScore})`
}

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 32) {
        playerRotate(1);
    }
});

playerReset();
updateScore();
update();