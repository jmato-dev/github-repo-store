class Score {
    constructor(selector) {
        this._value = 0;
        this._element = document.querySelector(selector);
    }

    get value() {
        return this._value;
    }
    set value(value) {
        let text;
        this._value = value;

        if (value < 10)
            text = '0000' + value;
        else if (value < 100)
            text = '000' + value;
        else if (value < 1000)
            text = '00' + value;
        else if (value < 10000)
            text = '0' + value;
        else if (value < 100000)
            text = value.toString();
        else
            return;

        this._element.textContent = text;
    }

    reset() {
        this.value = 0;
    }
};

const gameOver = document.querySelector('.game-over');
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let over = true;
let jumping = false;
let dino_position = 0;
let cactuses = 0;
let enemyMap = new Map();

let hi = new Score('.score .hi');

function handleKeyDown(event) {
    if (event.keyCode === 32 || event.keyCode === 38){
        if (!over) {
            jump();
        }
        else {
            over = false;
            newGame();
        }
    }
    // console.log(event.keyCode);
}
function newGame() {
    let score = new Score('.score .current');

    if (enemyMap.size) {
        for (enemy of enemyMap){
            enemy[1].element.remove();
        }
        enemyMap = new Map();
    }

    gameOver.style.opacity = '';
    background.classList.remove('paused');
    createCactus();
    setScores(score, hi);
}
function setScores(score, hi) {
    const iid = window.setInterval(() => {
        if (over) {
            window.clearInterval(iid);
            if (hi.value < score.value) hi.value = score.value;

            return;
        }
    
        score.value += 1;
    }, 100);
}
function jump(){
    jumping = true;

    let upInterval = setInterval(() => {
        if (dino_position >= 150){
            clearInterval(upInterval);
            jumpGoDown();
        }
        else{
            dino_position += 20;
            dino.style.bottom = dino_position + 'px';
        }
    }, 20);
}
function jumpGoDown() {
    let downInterval = setInterval(() =>{
        if (dino_position <= 0){
            clearInterval(downInterval);
            jumping = false;
        }
        else{
            dino_position -= 20;
            dino.style.bottom = dino_position + 'px';
        }
    });
}
function stopCactuses(cactus) {
    clearInterval(cactus.leftID);
    if (cactus.nextID)
        clearTimeout(cactus.nextID);
}
function createCactus() {
    const cactus = {
        element: document.createElement('div'),
        position: window.innerWidth - 60,
        num: cactuses++
    }
    let random = Math.random() * 6000;

    if (over) {
        return;
    }

    cactus.element.classList.add('cactus');
    cactus.element.style.left = cactus.position + 'px';

    background.append(cactus.element);

    cactus.leftID = setInterval(() => {
        // deter os cactus
        if (over){
            stopCactuses(cactus);
            gameOver.style.opacity = 1;
            background.classList.add('paused');
            return;
        }
        if (cactus.position <= -60){
            clearInterval(cactus.leftID);
            cactus.element.remove();
            enemyMap.delete(cactus.leftID);
        }
        else if (cactus.position > 0 && cactus.position < 60 && dino_position < 60) {
            over = true;
        }
        else {
            cactus.position -= 10;
            cactus.element.style.left = cactus.position + 'px';
        }
    }, 20);
    enemyMap.set(cactus.leftID, cactus);

    if (!over) {
        cactus.nextID = setTimeout(createCactus, random);
    }
}

document.addEventListener('keydown', handleKeyDown);