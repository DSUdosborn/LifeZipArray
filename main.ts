function setup() {
//State holds the information about pixel is live or dead
//false means dead, true means live.
    for (let x= 0; x < displaySize + 1; x++){
        for (let y= 0; y< displaySize + 1; y++){
            state.push(false)
        }
    }

    deadstate = state.slice()
    priorstate = state.slice()
    blinkstate = state.slice()
}

//get & set on any array
function getState(arr: boolean[], x: number, y: number): boolean {
    return arr[x * calcSize + y];
}
function setState(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * calcSize + y] = value;
}


//Use button A for the next iteration of game of life
input.onButtonPressed(Button.A, () => {
    gameOfLife();
    show();
})

//Use button B for reseting to random initial seed state
input.onButtonPressed(Button.B, () => {
    reset();
    show();
})

//Generate random initial state.
function reset() {
    for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, Math.randomBoolean());
        }
    }
}

//Show the lifeChart based on the state
function show() {
    tileDisplay.clear()
    for (let x = 1; x <= displaySize; x++) {
        for (let y = 1; y <= displaySize; y++) {
            if (getState(state, x, y)){
                tileDisplay.setMatrixColor(x-1, y-1, Kitronik_Zip_Tile.colors(ZipLedColors.Red))
            }
        }
    }
    tileDisplay.show()
}

function loadEdges(){
    // Set the outside edges to dead 
    for ( let colX = 0; colX < calcSize; colX++){
        setState(state,colX,0,false)
        setState(state,colX,calcSize-1,false)
    }
    for ( let rowY = 0; rowY < calcSize; rowY++){
        setState(state,0,rowY,false)
        setState(state,calcSize-1,rowY, false)
    }
}

//Core function
function gameOfLife() {
    let result: boolean[] = [];
    let count = 0;

    loadEdges()   

    for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            count = 0;

            //Count the live cells in the next row
            if ((x + 1) < calcSize) {
                if (getState(state, x + 1, y)) {
                    count++;
                }
                if ((y + 1 < calcSize) && getState(state, x + 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(state, x + 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the previous row
            if ((x - 1) >= 0) {
                if (getState(state, x - 1, y)) {
                    count++;
                }
                if ((y + 1 < calcSize) && getState(state, x - 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(state, x - 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the current row excluding the current position.
            if ((y - 1 >= 0) && getState(state, x, y - 1)) {
                count++;
            }
            if ((y + 1 < calcSize) && getState(state, x, y + 1)) {
                count++;
            }

            // Toggle live / dead cells based on the neighbour count.
            // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            // Any live cell with two or three live neighbours lives on to the next generation.
            // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            // Any live cell with more than three live neighbours dies, as if by overpopulation.
            switch (count) {
                case 0: setState(result, x, y, false); break;
                case 1: setState(result, x, y, false); break;
                case 2: setState(result, x, y, getState(state, x, y)); break;
                case 3: setState(result, x, y, true); break;
                default: setState(result, x, y, false); break;
            }
        }
    }
    //Update the state
    state = result;
}


let tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Visible)
tileDisplay.setBrightness(50)

let displaySize = 8
let calcSize = displaySize + 2
let state: boolean[] = [];
let deadstate: boolean[] = [];
let priorstate: boolean[] = [];
let blinkstate: boolean[] = [];
setup()

reset()
show()