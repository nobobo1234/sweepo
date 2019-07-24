const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class Box {
    constructor(x, y, length, isBomb) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.isBomb = isBomb;
        this.neighbors = [];
        this.bombs = 0;
        this.isChosen = false;
    }  

    addNeighbors(field) {
        for (let k = -1; k < 2; k++) {
            for (let m = -1; m < 2; m++) {
                if (this.x + k >= 0 && this.y + m >= 0 && this.x + k < field.length && this.y + m < field[0].length && abs(k) + abs(m) > 0) {
                    this.neighbors.push(field[this.x+k][this.y+m]);
                }
            }
        }
        this.bombs = this.neighbors.filter(box => box.isBomb).length;
    }

    async reveal() {
        this.isChosen = true;
        if (this.bombs === 0) {
            const toBeRevealed = [];
            for (const neighbor of this.neighbors) {
                if (!neighbor.isBomb && !neighbor.isChosen) toBeRevealed.push(neighbor);
            }
            await sleep(50);
            for (const neighbor of toBeRevealed) neighbor.reveal();
        }
    }   

    show() {
        const x = this.x * this.length;
        const y = this.y * this.length;
        push();
        if (this.isChosen) { 
            fill(200);
        } else {
            fill(255);
        }
        stroke(0);
        rect(x, y, this.length, this.length);
        // Draw the text
        if (this.isChosen && !this.isBomb) {
            fill(0);
            strokeWeight(0);
            textAlign(CENTER, CENTER);
            text(`${this.bombs ? this.bombs : ''}`, x + this.length / 2, y + this.length / 2);
        }
        if (this.isBomb && this.isChosen) {
            strokeWeight(0);
            fill(0);
            ellipse(x + this.length / 2, y + this.length / 2, this.length / 3);
        }
        pop();
    }
}
