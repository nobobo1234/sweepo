const fields = [];
const squareLength = 30; // Length of a square in the field in pixels


function setup() {
    createCanvas(windowWidth/2, windowHeight);
    
    for(let i = 0; i < (width-squareLength)/squareLength; i++) {
        fields.push([]); // Add a new column to the 2d array
        for(let j = 0; j < (height-squareLength)/squareLength; j++) {
            const x = i*squareLength;
            const y = j*squareLength;
            let isBomb = false;

            if(random() < 0.1) isBomb = true;

            fields[i][j] = new Box(x, y, squareLength, isBomb); // Add a new 'Box' to the field
        }
    }
}

function draw() {
    background(255);

    for(const box of fields.flat()) {
        box.show();
    }
}

function mousePressed() {
    const x = floor(mouseX / squareLength);
    const y = floor(mouseY / squareLength);
    fields[x][y].isChosen = true;
    if(fields[x][y].isBomb) {
        for(const box of fields.flat()) {
            box.isChosen = true;
        }
    }
}
