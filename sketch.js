let field = [];
let message;
const squareLength = 30; // Length of a square in the field in pixels
let firstClick = true;

function setup() {
    pixelDensity(1);
    createCanvas(windowWidth/2, windowHeight);
    const restart = createButton('Restart')
    restart.position(windowWidth/2 + 10, 10);
    restart.mousePressed(() => {
        field = [];
        firstClick = true;
        message.html('');
        setup();
    });
    message = createP('');
    message.position(windowWidth / 2 + 10, 30);
    
    for (let i = 0; i < (width-squareLength)/squareLength; i++) {
        field.push([]); // Add a new column to the 2d array
        for (let j = 0; j < (height-squareLength)/squareLength; j++) {
            const x = i;
            const y = j;

            field[i][j] = new Box(x, y, squareLength); // Add a new 'Box' to the field
        }
    }

    document.oncontextmenu = e => e.preventDefault();

    console.log('Done');
}

function draw() {
    background(255);

    for (const box of field.flat()) {
        box.show();
    }
}

function mousePressed() {
    const x = floor(mouseX / squareLength);
    const y = floor(mouseY / squareLength);
    if (mouseButton === LEFT) {
        if (field.flat().filter(b => b.isChosen).length + field.flat().filter(b => b.isBomb).length === field.flat().length) {
            message.html('You won!');
        }  

        if (x < field.length && y < field[0].length) {
            if (field[x][y].isFlagged) return; // Do nothing if field is flagged
            if (firstClick) { // If clicked for first time
                field[x][y].isChosen = true; // Reveal only this field

                // And then set all the bombs
                for (const box of field.flat()) {
                    if (random() < 0.2 && box.x !== x && box.y !== y) box.isBomb = true;
                }

                // And then count all the neighbors
                for (const box of field.flat()) {
                    box.addNeighbors(field);
                }
                firstClick = false;
            }
            field[x][y].reveal();
            // If you touch a bomb, you're game over
            if (field[x][y].isBomb) {
                for (const box of field.flat()) {
                    box.isChosen = true;
                }
                message.html('Game over! Please press restart to restart the game');                
            }
        }
    } else if (mouseButton === RIGHT && x < field.length && y < field[0].length) {
        if (!field[x][y].isChosen) field[x][y].isFlagged = !field[x][y].isFlagged; 
    }
}
