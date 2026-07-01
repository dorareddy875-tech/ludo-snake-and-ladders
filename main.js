let currentGame = null;
let currentGameType = 'snakes';

function initGameHub() {
    // Start with Snakes & Ladders default engine instance
    currentGame = new SnakesAndLadders('gameBoard');
    currentGame.drawBoard();
}

function switchGame(gameType) {
    currentGameType = gameType;
    
    // Manage UI styling classes
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (gameType === 'snakes') {
        currentGame = new SnakesAndLadders('gameBoard');
    } else if (gameType === 'ludo') {
        currentGame = new Ludo('gameBoard');
    }
    
    document.getElementById('dice-view').innerText = "-";
    currentGame.drawBoard();
}

function triggerDiceRoll() {
    // Generate standard 1-6 dice outcome
    const roll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-view').innerText = roll;
    
    // Pass execution turn values seamlessly inside active game container context
    currentGame.playTurn(roll);
}

// Fire system engine execution on load hook
window.onload = initGameHub;