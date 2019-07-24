const field = [];
const squareLength = 30; // Length of a square in the field in pixels


function setup() {
    pixelDensity(1);
    createCanvas(windowWidth/2, windowHeight);
    
    for(let i = 0; i < (width-squareLength)/squareLength; i++) {
        field.push([]); // Add a new column to the 2d array
        for(let j = 0; j < (height-squareLength)/squareLength; j++) {
            const x = i;
            const y = j;
            let isBomb = false;

            if(random() < 0.1) isBomb = true;

            field[i][j] = new Box(x, y, squareLength, isBomb); // Add a new 'Box' to the field
        }
    }

    for (const box of field.flat()) {
        box.addNeighbors(field);
    }
    console.log('Done');
}

function draw() {
    background(255);

    for(const box of field.flat()) {
        box.show();
    }
}

function mousePressed() {
    const x = floor(mouseX / squareLength);
    const y = floor(mouseY / squareLength);
    if(x < field.length && y < field[0].length) {
        field[x][y].reveal();
        // If you touch a bomb, you're game over
        if(field[x][y].isBomb) {
            for(const box of field.flat()) {
                box.isChosen = true;
            }
        }
    }
}
