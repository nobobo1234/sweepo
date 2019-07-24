class Box {
    constructor(x, y, length, isBomb) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.isBomb = isBomb;
        this.isFlagged = false;
        this.isChosen = false;
    }  

    show() {
        if(this.isChosen && this.isBomb) {
            fill(0);
        } else if(this.isChosen) {
            fill(200);
        } else {
            fill(255);
        }
        stroke(0);
        rect(this.x, this.y, 30, 30);
    }
}
