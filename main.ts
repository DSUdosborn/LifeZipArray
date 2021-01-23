
//State holds the information about pixel is live or dead
//false means dead, true means live.
let state = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false]

//get & set on any array
function getState(arr: boolean[], x: number, y: number): boolean {
    return arr[x * 8 + y];
}
function setState(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * 8 + y] = value;
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
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            setState(state, x, y, Math.randomBoolean());
        }
    }
}

//Show the lifeChart based on the state
function show() {
    tileDisplay.clear()
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (getState(state, x, y)){
                tileDisplay.setMatrixColor(x, y, Kitronik_Zip_Tile.colors(ZipLedColors.Red))
            }
        }
    }
    tileDisplay.show()
}

//Core function
function gameOfLife() {
    let result: boolean[] = [];
    let count = 0;

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            count = 0;

            //Count the live cells in the next row
            if ((x + 1) < 8) {
                if (getState(state, x + 1, y)) {
                    count++;
                }
                if ((y + 1 < 8) && getState(state, x + 1, y + 1)) {
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
                if ((y + 1 < 8) && getState(state, x - 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(state, x - 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the current row exlcuding the current position.
            if ((y - 1 >= 0) && getState(state, x, y - 1)) {
                count++;
            }
            if ((y + 1 < 8) && getState(state, x, y + 1)) {
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

reset()
show()