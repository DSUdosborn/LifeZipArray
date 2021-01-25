function setup() {
//State holds the information about pixel is live or dead
//false means dead, true means live.
    for (let y= 0; y < displaySize + 1; y++){
        for (let x= 0; x< displaySize + 1; x++){
            currentdisplay.push(false)
        }
    }
//  replicate for "death compares"
    deadstate = currentdisplay.slice()
    priorstate = currentdisplay.slice()
    blinkstate = currentdisplay.slice()
                                          
}

//get & set on any array
function getState(arr: boolean[], x: number, y: number): boolean {
    return arr[x * calcSize + y];
}
function setState(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * calcSize + y] = value;
}


// Random integer for ledColor array offset 
function randomInteger() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Use button A for the next iteration of game of life
input.onButtonPressed(Button.A, () => {
    gameOfLife();
})


//Use button B for reseting to random initial seed state
input.onButtonPressed(Button.B, () => {
    showRandom();
})

input.onButtonPressed(Button.AB, function () {
    showLogo()
    basic.pause(1000)
    let genlimit = 0
    switch (logostate) {
        case 1: logostate += 1; genlimit = 19; blinkDelay = 400; showBlinker(); break
        case 2: logostate += 1; genlimit = 25; blinkDelay = 250; showGlider(); break
        case 3: logostate += 1; genlimit = 21; blinkDelay = 200; showSpaceship(); break
        case 4: logostate += 1; genlimit = 25;  blinkDelay = 100; showLines(); break
        case 5: logostate += 1; genlimit = 133; blinkDelay = 50; showSoup(); break
        default: logostate = 1; blinkDelay = 300; break;
    }
    basic.pause(1000)
    for (let cycle = 1; cycle < 5; cycle++){
        let delay = 400 / cycle
        for ( let gen = 1; gen < genlimit; gen ++){
            gameOfLife();
            basic.pause(delay)
        }
    }
})


// Set the Zip Tile Leds  and display
function show() {
    tileDisplay.clear()
    tileDisplay.show()
    basic.pause(blinkDelay)
    for (let y = 1; y <= displaySize; y++) {
        for (let x = 1; x <= displaySize; x++) {
            if (currentdisplay[y * calcSize + x]){               
                tileDisplay.setMatrixColor(x-1, y-1, Kitronik_Zip_Tile.colors(ledColors[randomInteger()]))
            }
        }
    }
    tileDisplay.show()
}


//Generate random initial state.
function showRandom() {

    priorstate = deadstate.slice()
    blinkDelay = 300
    for (let y = 0; y < calcSize; y++) {
        for (let x = 0; x < calcSize; x++) {
            currentdisplay[x * calcSize + y] = Math.randomBoolean()
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()
    show()
}

function showLogo() {
    tileDisplay.showRainbow(1, 360)
    tileDisplay.show()

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
     for (let y = 0; y < calcSize; y++) {
        for (let x = 0; x < calcSize; x++) {
            currentdisplay[x * calcSize + y] = logo[x * calcSize + y]
        }
    } 
    show()

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
            currentdisplay[x * calcSize + y] =  getState(cornerSoup,x,y)
        }
    } 

    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()
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
            currentdisplay[x * calcSize + y] =  getState(glider,x,y)
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
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
            currentdisplay[x * calcSize + y] =  getState(spaceShip,x,y)
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
    show()
    basic.pause(3000)   
}
function showBlinker() {   
    let bigBlinker: boolean[] = [
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,true,false,false,true,false,false,false,
        false,false,false,true,false,false,true,false,false,false,
        false,false,false,true,false,false,true,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false,false                    
        ]  

     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            currentdisplay[x * calcSize + y] =  getState(bigBlinker,x,y)
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
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
            currentdisplay[x * calcSize + y] =  getState(shortLines,x,y)
        }
    } 
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()
    show() 

}
function loadEdges(){
    // Set the outside edges to dead 
    for ( let colX = 0; colX < calcSize; colX++){
        setState(currentdisplay,colX,0, getState(currentdisplay,colX,displaySize))
        setState(currentdisplay,colX,calcSize-1, getState(currentdisplay,colX,1,))
    }
    for ( let rowY = 0; rowY < calcSize; rowY++){
        setState(currentdisplay,0,rowY, getState(currentdisplay,displaySize,rowY))
        setState(currentdisplay,calcSize -1,rowY, getState(currentdisplay,1,rowY))
    }
}
//Core function
function gameOfLife() {
    let result: boolean[] = deadstate.slice();
    let count = 0;

loadEdges() 

    for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            count = 0;

            //Count the live cells in the next row
            if ((x + 1) < calcSize) {
                if (getState(currentdisplay, x + 1, y)) {
                    count++;
                }
                if ((y + 1 < calcSize) && getState(currentdisplay, x + 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(currentdisplay, x + 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the previous row
            if ((x - 1) >= 0) {
                if (getState(currentdisplay, x - 1, y)) {
                    count++;
                }
                if ((y + 1 < calcSize) && getState(currentdisplay, x - 1, y + 1)) {
                    count++;
                }
                if ((y - 1 >= 0) && getState(currentdisplay, x - 1, y - 1)) {
                    count++;
                }
            }

            //Count the live cells in the current row excluding the current position.
            if ((y - 1 >= 0) && getState(currentdisplay, x, y - 1)) {
                count++;
            }
            if ((y + 1 < calcSize) && getState(currentdisplay, x, y + 1)) {
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
                case 2: setState(result, x, y, getState(currentdisplay, x, y)); break;
                case 3: setState(result, x, y, true); break;
                default: setState(result, x, y, false); break;
            }
        }
    }

    //blank the edges
     for ( let colX = 0; colX < calcSize; colX++){
        setState(result,colX,0, false)
        setState(result,colX,calcSize-1, false)
    }
    for ( let rowY = 0; rowY < calcSize; rowY++){
        setState(result,0,rowY, false)
        setState(result,calcSize -1,rowY, false)
    }     

    // check for auto reset conditions
    if (result.every((val, index) => val === deadstate[index])) {
        showERR()
    } else {
        if (result.every((val, index) => val === priorstate[index])) {
            showERR()
        }  else {
            if ( result.every((val, index) => val === blinkstate[index]) ){
            showERR();
            } else { 
                //Update the state maps 
                blinkstate = priorstate.slice()
                priorstate = currentdisplay.slice()
                currentdisplay = result.slice();
                show()
            }
        }
    }
}


function showERR(){
    tileDisplay.clear()
    tileDisplay.show()
    tileDisplay.showRainbow(1, 360)
    tileDisplay.show()
    basic.pause(1500)
    showRandom()
}

// Display setup related to Zip Tile LED Array 
let tileDisplay = Kitronik_Zip_Tile.createZIPTileDisplay(1, 1, Kitronik_Zip_Tile.UBitLocations.Visible)
tileDisplay.setBrightness(32)


//Random color setup   array of enumerated colors, min color, max color  (0-7  excludes  Black/white)
let ledColors = [ZipLedColors.Red,ZipLedColors.Orange,ZipLedColors.Yellow,ZipLedColors.Green,ZipLedColors.Blue,
                    ZipLedColors.Indigo,ZipLedColors.Violet,ZipLedColors.Purple,ZipLedColors.Black,ZipLedColors.White]
let min = 0
let max = 7

// GOL related parameters...
let displaySize = 8
let calcSize = displaySize + 2

let currentdisplay: boolean[] = [];
let deadstate: boolean[] = [];
let priorstate: boolean[] = [];
let blinkstate: boolean[] = [];

// Housekeeping
let shakeEnabled: boolean = false
let logostate = 1
let blinkDelay = 300

setup()
showLogo()
