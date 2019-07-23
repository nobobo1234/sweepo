const fields = [];
const squareLength = 30; // Length of a square in the field in pixels


function setup() {
    createCanvas(windowWidth/2, windowHeight);
    
    for(let i = 0; i < width-squareLength; i+=squareLength) {
        for(let j = 0; j < height-squareLength; j+=squareLength) {
            fields.push(new Box(false));
        }
    }
}

function draw() {
    background(51);

    for(let i = 0; i < width-squareLength; i+=squareLength) {
        for(let j = 0; j < height-squareLength; j+=squareLength) {
            stroke(255);
            strokeWeight(1);
            fill(51);
            rect(i, j, squareLength, squareLength);
        }
    }
}
