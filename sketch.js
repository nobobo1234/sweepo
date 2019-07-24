let field = [];
let message;
const squareLength = 30; // Length of a square in the field in pixels


function setup() {
    pixelDensity(1);
    createCanvas(windowWidth/2, windowHeight);
    const restart = createButton('Restart')
    restart.position(windowWidth/2 + 10, 10);
    restart.mousePressed(() => {
        field = [];
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
            let isBomb = false;

            if (random() < 0.2) isBomb = true;

            field[i][j] = new Box(x, y, squareLength, isBomb); // Add a new 'Box' to the field
        }
    }

    for (const box of field.flat()) {
        box.addNeighbors(field);
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
    if (mouseButton === LEFT) {
        if (field.flat().filter(b => b.isChosen).length + field.flat().filter(b => b.isBomb).length === field.flat().length) {
            message.html('You won!');
        }

        const x = floor(mouseX / squareLength);
        const y = floor(mouseY / squareLength);
        if (x < field.length && y < field[0].length) {
            field[x][y].reveal();
            // If you touch a bomb, you're game over
            if (field[x][y].isBomb) {
                for (const box of field.flat()) {
                    box.isChosen = true;
                }
                message.html('Game over! Please press restart to restart the game');                
            }
        }
    }
}
