function setup() {
//State holds the information about pixel is live or dead
//false means dead, true means live.
    for (let x= 0; x < displaySize + 1; x++){
        for (let y= 0; y< displaySize + 1; y++){
            state.push(false)
        }
    }
//  replicate for "death compares"
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

// compare array to empty
function isDead () {
    return state.every((val, index) => val === deadstate[index])
}
// compare array to prior
function isSame () {
    return state.every((val, index) => val === priorstate[index])
}


// Random integer for ledColor array offset 
function randomInteger() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

input.onButtonPressed(Button.AB, function () {
    showLogo()
    let genlimit = 0
    if (logostate == 1){
        showGlider();
        logostate += 1
        genlimit = 25
    }  else {
        if (logostate == 2){
            showSpaceship();
            logostate +=1
            genlimit = 30
        }  else {
            if (logostate == 3) {
                showLines()
                genlimit = 25
                logostate += 1 
            }  else {
                showSoup()
                genlimit = 133
                logostate = 1
            }
        }
    }  
    	
    basic.pause(1000)
    for (let cycle = 1; cycle < 5; cycle++){
        let delay = 300 / cycle
        for ( let gen = 1; gen < genlimit; gen ++){
            gameOfLife();
            show();
            basic.pause(delay)
        }
    }
})

//Generate random initial state.
function reset() {
    for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, Math.randomBoolean());
        }
    }
}
function showLogo() {
    let logo: boolean[] = [false,false,false,false,false,false,false,false,false,false,
            false,false,false,false,false,false,false,false,false,false,
            false,false,true,true,false,false,true,true,false,false,
            false,false,true,true,false,false,true,true,false,false,
            false,false,false,false,true,true,true,true,false,false,
            false,false,false,false,true,true,true,true,false,false,
            false,false,false,false,true,true,false,false,false,false,
            false,false,false,false,true,true,false,false,false,false,
            false,false,false,false,false,false,false,false,false,false,
            false,false,false,false,false,false,false,false,false,false            
            ]  
     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, getState(logo,x,y));
        }
    } 
    show()
    basic.pause(4000)  
}

function showSoup() {
    let cornerSoup: boolean[] = [false,false,false,false,false,false,false,false,false,false,
                    false,false,true,false,false,false,false,false,true,false,
                    false,true,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,true,false,false,false,false,false,false,false,
                    false,true,false,true,false,false,false,false,false,false,
                    false,false,false,true,false,false,false,false,true,false,
                    false,false,true,true,false,false,false,true,true,false,
                    false,false,false,false,false,false,false,false,false,false                    
                    ] 
     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, getState(cornerSoup,x,y));
        }
    } 
    show()  
}

function showGlider() {
    let glider: boolean[] = [false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,true,false,true,false,false,false,false,
                    false,false,false,false,true,true,false,false,false,false,
                    false,false,false,false,true,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false                    
                    ] 
     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, getState(glider,x,y));
        }
    } 
    show()
    basic.pause(3000)   
}
function showSpaceship() {
    let spaceShip: boolean[] = [false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,true,true,false,false,false,false,
                    false,false,false,true,true,false,true,true,false,false,
                    false,false,false,false,true,true,true,true,false,false,
                    false,false,false,false,false,true,true,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false                    
                    ]  

     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, getState(spaceShip,x,y));
        }
    } 
    show()
    basic.pause(3000)   
}
function showLines() {
let shortLines: boolean[] = [false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,true,true,true,true,true,true,true,true,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,true,true,true,true,true,true,true,true,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,true,true,true,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,true,true,true,false,false,
                    false,false,false,false,false,false,false,false,false,false                    
                    ];
     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            setState(state, x, y, getState(shortLines,x,y));
        }
    } 
    show() 

}
//Show the lifeChart based on the state
function show() {
    tileDisplay.clear()
    basic.pause(500)
    for (let x = 1; x <= displaySize; x++) {
        for (let y = 1; y <= displaySize; y++) {
            if (getState(state, x, y)){               
                tileDisplay.setMatrixColor(x-1, y-1, Kitronik_Zip_Tile.colors(ledColors[randomInteger()]))
            }
        }
    }
    tileDisplay.show()
}

function loadEdges(){
    // Set the outside edges to dead 
    for ( let colX = 0; colX < calcSize; colX++){
        setState(state,colX,0, getState(state,colX,displaySize))
        setState(state,colX,calcSize-1, getState(state,colX,1,))
    }
    for ( let rowY = 0; rowY < calcSize; rowY++){
        setState(state,0,rowY, getState(state,displaySize,rowY))
        setState(state,calcSize -1,rowY, getState(state,1,rowY))
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
    //Update the state maps 
    priorstate = state.slice()
    blinkstate = priorstate.slice()
    state = result;
}

let ledColors = [ZipLedColors.Red,ZipLedColors.Orange,ZipLedColors.Yellow,ZipLedColors.Green,ZipLedColors.Blue,
                    ZipLedColors.Indigo,ZipLedColors.Violet,ZipLedColors.Purple,ZipLedColors.Black,ZipLedColors.White]
let min = 0
let max = 7
let tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Visible)
tileDisplay.setBrightness(32)
let logostate = 1
let displaySize = 8
let calcSize = displaySize + 2
let state: boolean[] = [];
let deadstate: boolean[] = [];
let priorstate: boolean[] = [];
let blinkstate: boolean[] = [];

let shakeEnabled: boolean = false
setup()
reset()
show()