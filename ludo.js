class Ludo {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = this.canvas.width / 15; // Ludo is traditional 15x15 units
        this.players = [
            { id: 1, color: '#e74c3c', tokens: [0, 0, 0, 0] }, // Red
            { id: 2, color: '#3498db', tokens: [0, 0, 0, 0] }  // Blue
        ];
        this.turn = 0;
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let size = this.cellSize;

        // Draw Basic Quad Layout boxes
        // Red Home base zone
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(0, 0, size * 6, size * 6);
        
        // Blue Home base zone
        this.ctx.fillStyle = '#3498db';
        this.ctx.fillRect(size * 9, 0, size * 6, size * 6);

        // Center Win Zone Square
        this.ctx.fillStyle = '#f1c40f';
        this.ctx.fillRect(size * 6, size * 6, size * 3, size * 3);

        // Draw standard cross tracks grid boundaries
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;
        for (let r = 0; r < 15; r++) {
            for (let c = 0; c < 15; c++) {
                // Draw tracks selectively only where cross lanes live
                if ((r >= 6 && r <= 8) || (c >= 6 && c <= 8)) {
                    this.ctx.strokeRect(c * size, r * size, size, size);
                }
            }
        }
        
        this.ctx.fillStyle = '#333';
        this.ctx.font = '20px Arial';
        this.ctx.fillText("Ludo Map Engine Active", size * 1.5, size * 7.7);
    }

    playTurn(diceRoll) {
        // Simplified programmatic showcase move: Moves Token 0 of current active color
        let player = this.players[this.turn];
        player.tokens[0] += diceRoll; 

        // Cycle turn back and forth
        this.turn = (this.turn + 1) % this.players.length;
        document.getElementById('status').innerText = `Player ${this.turn + 1}'s Turn (Ludo)`;
        this.drawBoard();
    }
}