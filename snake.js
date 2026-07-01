class SnakesAndLadders {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.boardSize = 10; // 10x10 grid
        this.cellSize = this.canvas.width / this.boardSize;
        
        // Define Snakes (head -> tail) and Ladders (bottom -> top)
        this.portals = {
            4: 14, 9: 31, 20: 38, 28: 84, 40: 59, 51: 67, 63: 81, 71: 91, // Ladders
            17: 7, 54: 34, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 99: 78  // Snakes
        };
        
        this.players = [{ id: 1, pos: 1, color: '#e74c3c' }, { id: 2, pos: 1, color: '#3498db' }];
        this.turn = 0;
    }

    // Convert flat tile number (1-100) to Canvas (X, Y) pixel coordinates
    getCoordinates(pos) {
        let zeroIndexed = pos - 1;
        let row = Math.floor(zeroIndexed / this.boardSize);
        let col = zeroIndexed % this.boardSize;
        
        // Boustrophedon (Snake-like grid layout alternating direction every row)
        if (row % 2 === 1) {
            col = this.boardSize - 1 - col;
        }
        
        let x = col * this.cellSize + this.cellSize / 2;
        let y = this.canvas.height - (row * this.cellSize + this.cellSize / 2);
        return { x, y };
    }

    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 1. Draw Grid Tiles
        for (let i = 1; i <= 100; i++) {
            let coords = this.getCoordinates(i);
            let cellRow = Math.floor((i - 1) / 10);
            let cellCol = (i - 1) % 10;
            
            this.ctx.fillStyle = (cellRow + cellCol) % 2 === 0 ? '#f9f9f9' : '#e0e0e0';
            this.ctx.fillRect(coords.x - this.cellSize/2, coords.y - this.cellSize/2, this.cellSize, this.cellSize);
            this.ctx.strokeRect(coords.x - this.cellSize/2, coords.y - this.cellSize/2, this.cellSize, this.cellSize);
            
            this.ctx.fillStyle = '#7f8c8d';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(i, coords.x - this.cellSize/2 + 5, coords.y - this.cellSize/2 + 15);
        }

        // 2. Draw Snakes & Ladders Indicators (Basic representation lines)
        for (let start in this.portals) {
            let from = this.getCoordinates(parseInt(start));
            let to = this.getCoordinates(this.portals[start]);
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = start < this.portals[start] ? '#2ecc71' : '#e67e22'; // Green ladder, Orange snake
            this.ctx.stroke();
        }

        // 3. Draw Players
        this.players.forEach(p => {
            let coords = this.getCoordinates(p.pos);
            this.ctx.beginPath();
            this.ctx.arc(coords.x, coords.y, 12, 0, 2 * Math.PI);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#fff';
            this.ctx.stroke();
        });
    }

    playTurn(diceRoll) {
        let player = this.players[this.turn];
        if (player.pos + diceRoll <= 100) {
            player.pos += diceRoll;
            // Check for snake or ladder jump
            if (this.portals[player.pos]) {
                player.pos = this.portals[player.pos];
            }
        }

        if (player.pos === 100) {
            alert(`Player ${player.id} Wins!`);
            this.reset();
            return;
        }

        // Switch turn
        this.turn = (this.turn + 1) % this.players.length;
        document.getElementById('status').innerText = `Player ${this.turn + 1}'s Turn`;
        this.drawBoard();
    }

    reset() {
        this.players.forEach(p => p.pos = 1);
        this.turn = 0;
        this.drawBoard();
    }
}