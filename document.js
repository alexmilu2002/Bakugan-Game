let playerHealth = 100;
let opponentHealth = 100;
let playerDodged = false;
let opponentDodged = false;
let round = 1;

const attacks = {
    tackle: { min: 5, max: 15, threshold: 12 },
    quickAttack: { min: 8, max: 12, threshold: 10 },
    specialAttack: { min: 10, max: 20, threshold: 18 }
};

function attack(type) {
    if (playerDodged || opponentDodged) {
        playerDodged = false;
        opponentDodged = false;
    }

    // Player attacks opponent
    if (!opponentDodged) {
        let playerAttack = getRandomDamage(attacks[type]);
        opponentHealth -= playerAttack;
        if (opponentHealth < 0) opponentHealth = 0;
        document.getElementById('opponent-health').innerText = `Health: ${opponentHealth}`;
        logBattle(`Dragonoid used ${type}! Damage: ${playerAttack}. ${playerAttack > attacks[type].threshold ? 'It was powerful!' : ''}`);

        // Check if opponent is defeated
        if (opponentHealth === 0) {
            alert('You win!');
            playVictorySound();
            resetGame();
            return;
        }
    } else {
        logBattle("Drakus dodged your attack!");
    }

    // Opponent's turn
    setTimeout(opponentTurn, 1000);
}

function dodge() {
    playerDodged = true;
    setTimeout(opponentTurn, 1000);
    logBattle("Dragonoid dodged!");
}

function opponentTurn() {
    if (!playerDodged) {
        let attackTypes = Object.keys(attacks);
        let randomAttack = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        let opponentAttack = getRandomDamage(attacks[randomAttack]);
        playerHealth -= opponentAttack;
        if (playerHealth < 0) playerHealth = 0;
        document.getElementById('player-health').innerText = `Health: ${playerHealth}`;
        logBattle(`Drakus used ${randomAttack}! Damage: ${opponentAttack}. ${opponentAttack > attacks[randomAttack].threshold ? 'It was powerful!' : ''}`);

        // Check if player is defeated
        if (playerHealth === 0) {
            alert('You lose!');
            playDefeatSound();
            resetGame();
            return;
        }
    } else {
        logBattle("You dodged the Drakus' attack!");
    }

    // Increment round
    round++;
    document.getElementById('round-info').innerText = `Round: ${round}`;
}

function getRandomDamage(attack) {
    return Math.floor(Math.random() * (attack.max - attack.min + 1)) + attack.min;
}

function logBattle(message) {
    let battleLog = document.getElementById('battle-log');
    battleLog.innerText += `${message}\n`;
    battleLog.scrollTop = battleLog.scrollHeight;
}


function resetGame() {
    playerHealth = 100;
    opponentHealth = 100;
    playerDodged = false;
    opponentDodged = false;
    round = 1;
    document.getElementById('player-health').innerText = 'Health: 100';
    document.getElementById('opponent-health').innerText = 'Health: 100';
    document.getElementById('round-info').innerText = 'Round: 1';
    document.getElementById('battle-log').innerText = 'Battle Log:\n';
}

function playVictorySound() {
    let victorySound = document.getElementById('victory-sound');
    victorySound.play();
}
function playDefeatSound() {
    let defeatsound = document.getElementById('defeat-sound');
    defeatsound.play();
}