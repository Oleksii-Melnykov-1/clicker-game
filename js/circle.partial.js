let score = 0;
let clicks = 0;
let autoPlus = 0;

let bgMusic = new Audio('audio/main.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.03;

function clickCircle() {
    score = score + 1;
    clicks = clicks + 1;
    document.getElementById("score").innerText = score;

    let audio = new Audio('audio/cut.mp3');
    audio.volume = 0.1;
    audio.play();

    if (bgMusic.paused) {
        bgMusic.play();
    }
}

function addAuto(amount, id) {
    let price = amount * 60;

    if (score >= price) {
        score = score - price;
        document.getElementById("score").innerText = score;

        autoPlus = autoPlus + amount;

        let element = document.getElementById(id);
        let currentCount = parseInt(element.innerText);
        let newCount = currentCount + 1;
        element.innerText = newCount;
    }
}

setInterval(function () {
    document.getElementById("cps").innerText = "CPS: " + clicks;
    document.getElementById("dps").innerText = "DPS: " + autoPlus;
    clicks = 0;
    score = score + autoPlus;
    document.getElementById("score").innerText = score;
}, 1000);

function saveGame() {
    let gameData = {
        score: score,
        autoPlus: autoPlus,
        items: {}
    };

    for (let i = 1; i <= 5; i++) {
        let id = 'count-' + i;
        let el = document.getElementById(id);
        if (el) {
            gameData.items[id] = parseInt(el.innerText);
        }
    }

    localStorage.setItem('clickerSave', JSON.stringify(gameData));
}

function loadGame() {
    let savedData = localStorage.getItem('clickerSave');
    if (savedData) {
        let gameData = JSON.parse(savedData);
        score = gameData.score;
        autoPlus = gameData.autoPlus;

        document.getElementById("score").innerText = score;

        for (let id in gameData.items) {
            let el = document.getElementById(id);
            if (el) {
                el.innerText = gameData.items[id];
            }
        }
    }
}

function resetGame() {
    score = 0;
    clicks = 0;
    autoPlus = 0;

    document.getElementById("score").innerText = score;
    document.getElementById("cps").innerText = "CPS: 0";
    document.getElementById("dps").innerText = "DPS: 0";

    for (let i = 1; i <= 5; i++) {
        let id = 'count-' + i;
        let el = document.getElementById(id);
        if (el) {
            el.innerText = 0;
        }
    }

    localStorage.removeItem('clickerSave');
}

setTimeout(loadGame, 1000);

setInterval(saveGame, 5000);
