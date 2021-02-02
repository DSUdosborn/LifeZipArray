function setup() {
// currentdisplay is the map of LED   ON/OFF  status
//   use the calculation size to preload the external edges
    for (let y= 0; y < displaySize + 1; y++){
        for (let x= 0; x< displaySize + 1; x++){
            currentdisplay.push(false)
        }
    }
//  replicate for autoreset compares
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

// trigger a call to gameOfLife if we get a "go" string
radio.onReceivedString(function (receivedString: string) {
    if ( receivedString == "go") {
        gameOfLife()
    }
})

//Use button A for the next iteration of game of life
input.onButtonPressed(Button.A, () => {
    genlimit = 0
    gameOfLife();
})


//Use button B for reseting to random initial seed state
input.onButtonPressed(Button.B, () => {
    genlimit = 0
    showRandom();
})

input.onButtonPressed(Button.AB, function () {
    genlimit = 0
    switch (logostate) {
        case 1: logostate += 1; genlimit = 1; blinkDelay = 400; showStable(); break
        case 2: logostate += 1; genlimit = 19; blinkDelay = 400; showBlinker(); break
        case 3: logostate += 1; genlimit = 25; blinkDelay = 250; showGlider(); break
        case 4: logostate += 1; genlimit = 21; blinkDelay = 200; showSpaceship(); break
        case 5: logostate += 1; genlimit = 25;  blinkDelay = 100; showLines(); break
        case 6: logostate += 1; genlimit = 133; blinkDelay = 50; showSoup(); break
        default: logostate = 1; blinkDelay = 300; showLogo(); break;
    }
    basic.pause(1000)
    for (let cycle = 1; cycle < 5; cycle++){
        let delay = 400 / cycle
        for ( let gen = 1; gen < genlimit; gen++){
            gameOfLife();
            basic.pause(delay)
        }
    }
})


// Random integer for ledColor array offset 
function randomInteger() {
  return Math.floor(Math.random() * (colorIndexMax - colorIndexMin + 1)) + colorIndexMin;
}

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

    currentdisplay = deadstate.slice()
    priorstate = deadstate.slice()
    blinkDelay = 300
    for (let y = 1; y <= displaySize; y++) {
        for (let x = 1; x <= displaySize; x++) {
            currentdisplay[x * calcSize + y] = Math.randomBoolean()
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()

    colorIndexMin = 0
    colorIndexMax = 7

    show()
}

function showLogo() {
    tileDisplay.showRainbow(1, 360)
    tileDisplay.show()

    colorIndexMin = 4
    colorIndexMax = 4

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

function showStable() {  

    colorIndexMin = 9
    colorIndexMax = 9

    let stable: boolean[] = [false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,true,true,false,false,false,false,
                    false,false,false,false,true,true,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false,
                    false,false,false,false,false,false,false,false,false,false                    
                    ] 
     for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            currentdisplay[x * calcSize + y] =  stable[x * calcSize + y]
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
    show()
    basic.pause(3000)   
}

function showSoup() { 

    colorIndexMin = 4
    colorIndexMax = 7

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
            currentdisplay[x * calcSize + y] =  cornerSoup[x * calcSize + y]
        }
    } 

    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()
    show()  
}

function showGlider() {  

    colorIndexMin = 4
    colorIndexMax = 4

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
            currentdisplay[x * calcSize + y] =  glider[x * calcSize + y]
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
    show()
    basic.pause(3000)   
}

function showSpaceship() { 

    colorIndexMin = 0
    colorIndexMax = 3

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
            currentdisplay[x * calcSize + y] =  spaceShip[x * calcSize + y]
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
    show()
    basic.pause(3000)   
}

function showBlinker() {  

    colorIndexMin = 0
    colorIndexMax = 0

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
            currentdisplay[x * calcSize + y] =  bigBlinker[x * calcSize + y]
        }
    }
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice() 
    show()
    basic.pause(3000)   
}

function showLines() {

    colorIndexMin = 4
    colorIndexMax = 7

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
            currentdisplay[x * calcSize + y] =  shortLines[x * calcSize + y]
        }
    } 
    blinkstate = priorstate.slice()
    priorstate = currentdisplay.slice()
    show() 

}


// Count Neighbors and build next generation 

function gameOfLife() {
    let result: boolean[] = deadstate.slice();
    let count = 0;

    myEdge1 = 0;
    myEdge2 = 0;
    myEdge3 = 0;
    myEdge4 = 0;
    
// load the edges into extended array before counting neighbors
                for ( let colX = 0; colX < calcSize; colX++){
                    currentdisplay[colX * calcSize + 0] = currentdisplay[colX * calcSize + displaySize]


                    currentdisplay[colX * calcSize + (calcSize-1)] = currentdisplay[colX * calcSize + 1]


                }
                for ( let rowY = 0; rowY < calcSize; rowY++){
                    currentdisplay[0 * calcSize + rowY] = currentdisplay[displaySize * calcSize + rowY]


                    currentdisplay[(calcSize -1) * calcSize + rowY] = currentdisplay[1 * calcSize + rowY]

                }

    for (let x = 0; x < calcSize; x++) {
        for (let y = 0; y < calcSize; y++) {
            count = 0;

            //Count the live cells in the next row
            if ((x + 1) < calcSize) {
                if (currentdisplay[ (x + 1) * calcSize +  y]) {
                    count++;
                }
                if ((y + 1 < calcSize) && currentdisplay[ (x + 1) * calcSize +  (y + 1)] ) {
                    count++;
                }
                if ((y - 1 >= 0) && currentdisplay[ (x + 1) * calcSize +  (y - 1)]) {
                    count++;
                }
            }

            //Count the live cells in the previous row
            if ((x - 1) >= 0) {
                if (currentdisplay[ (x - 1) * calcSize +  y]) {
                    count++;
                }
                if ((y + 1 < calcSize) && currentdisplay[ (x - 1) * calcSize +  (y + 1)]) {
                    count++;
                }
                if ((y - 1 >= 0) && currentdisplay[ (x - 1) * calcSize +  (y - 1)]) {
                    count++;
                }
            }

            //Count the live cells in the current row excluding the current position.
            if ((y - 1 >= 0) && currentdisplay[ x * calcSize +  (y - 1)]) {
                count++;
            }
            if ((y + 1 < calcSize) && currentdisplay[ x * calcSize +  (y + 1)]) {
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

//blank the edges so they dont impact error checks
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

//Update the auto-restart maps 
                blinkstate = priorstate.slice()
                priorstate = currentdisplay.slice()
                currentdisplay = result.slice();

// load the edges into extended array before counting neighbors
                for ( let colX = 0; colX < calcSize; colX++){
                    if ( currentdisplay[colX * calcSize + displaySize]){
                        myEdge2 += binaryFactors[colX]
                    }
                    if ( currentdisplay[colX * calcSize + 1]){
                        myEdge1 += binaryFactors[colX]
                    }
                }
                for ( let rowY = 0; rowY < calcSize; rowY++){
                    if (currentdisplay[displaySize * calcSize + rowY]){
                        myEdge4 += binaryFactors[rowY]
                    }
                    if (currentdisplay[1 * calcSize + rowY]){
                        myEdge3 += binaryFactors[rowY]
                    }
                }

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
let colorIndexMin = 3
let colorIndexMax = 7

// GOL related parameters...
let displaySize = 8
let calcSize = displaySize + 2

let currentdisplay: boolean[] = [];
let deadstate: boolean[] = [];
let priorstate: boolean[] = [];
let blinkstate: boolean[] = [];


let myEdge1: number = 0;
let myEdge2: number = 0;
let myEdge3: number = 0;
let myEdge4: number = 0;

let edge1Buffer: boolean[] = []
let edge2Buffer: boolean[] = []
let edge3Buffer: boolean[] = []
let edge4Buffer: boolean[] = []

let binaryFactors: number[] = [ 128, 64, 32, 16, 8, 4, 2, 1]

// Housekeeping
let logostate = 1
let blinkDelay = 300

//  break index for demos 
let genlimit = 0

// administrivia for Radio
radio.setTransmitPower(1)
radio.setGroup(42)

setup()
showLogo()

