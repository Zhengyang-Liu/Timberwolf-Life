//PlayerData
var numOfMove1;
var numOfMove2;
//index of current player, start from 1.
var currentPlayer = 1;
var cellNumber = 0;
var territory = 0;
//Cell code
var DEAD_CELL;
var LIVE_CELL;
var VOID_CELL;
var GHOST_CELL;
//Color var
var EMPTY_COLOR;
var LIVE_COLOR;
var DEAD_COLOR;
var GHOST_COLOR;
var VOID_COLOR;
var GRID_LINES_COLOR;
var TEXT_COLOR;
var BRIGHT_COLOR;
//algorithm var
var TOP_LEFT;
var TOP_RIGHT;
var BOTTOM_LEFT;
var BOTTOM_RIGHT;
var TOP;
var BOTTOM;
var LEFT;
var RIGHT;
var CENTER;
//FPS setting(no need)
var MILLISECONDS_IN_ONE_SECOND;
var MAX_FPS;
var MIN_FPS;
var FPS_INC;
var FPS_X;
var FPS_Y;
//interface adjustments
var MAX_CELL_LENGTH;
var MIN_CELL_LENGTH;
var CELL_LENGTH_INC;
var CELL_LENGTH_X;
var CELL_LENGTH_Y;
var GRID_LINE_LENGTH_RENDERING_THRESHOLD;
// FRAME RATE TIMING VARIABLES
var timer;
var fps;
var frameInterval;
// CANVAS VARIABLES
var canvasWidth;
var canvasHeight;
var canvas;
var canvas2D;
// GRID VARIABLES
var gridWidth;
var gridHeight;
var gameGrid;
var updateGrid;
var renderGrid;
var ghostGrid;
var brightGrid;
// RENDERING VARIABLES
var cellLength;
var ghostInterval;
var setVoidCellInterval;
var mouseIsDown;

function initGameOfLife() {
    // INIT ALL THE CONSTANTS, i.e. ALL THE
    // THINGS THAT WILL NEVER CHANGE
    initConstants();
    // INIT THE RENDERING SURFACE
    initCanvas();
    // INIT ALL THE GAME-RELATED VARIABLES
    initGameOfLifeData();
    // INIT THE LOOKUP TABLES FOR THE SIMULATION
    initCellLookup();
    // SETUP THE EVENT HANDLERS
    initEventHandlers();
    //Start first Turn;
    nextTrun();
    // RESET EVERYTHING, CLEARING THE CANVAS
    resetGameOfLife();
}

function initConstants() {
    // THESE REPRESENT THE TWO POSSIBLE STATES FOR EACH CELL
    DEAD_CELL = 0;
    LIVE_CELL = 1;
    GHOST_CELL = 2;
    VOID_CELL = 3;
    // COLORS FOR RENDERING
    EMPTY_COLOR = "#ffffff";
    LIVE_COLOR = [];
    DEAD_COLOR = [];
    LIVE_COLOR[1] = "#FF0000";
    DEAD_COLOR[1] = "#ff7272";
    LIVE_COLOR[2] = "#1c23ff";
    DEAD_COLOR[2] = "#7277ff";
    GRID_LINES_COLOR = "#CCCCCC";
    TEXT_COLOR = "#7777CC";
    GHOST_COLOR = "rgba(255, 0, 0, 0.5)";
    BRIGHT_COLOR = "#66ffff";
    VOID_COLOR = "#80bfff";
    // THESE REPRESENT THE DIFFERENT TYPES OF CELL LOCATIONS IN THE GRID
    TOP_LEFT = 0;
    TOP_RIGHT = 1;
    BOTTOM_LEFT = 2;
    BOTTOM_RIGHT = 3;
    TOP = 4;
    BOTTOM = 5;
    LEFT = 6;
    RIGHT = 7;
    CENTER = 8;
    // FPS CONSTANTS
    MILLISECONDS_IN_ONE_SECOND = 1000;
    MAX_FPS = 33;
    MIN_FPS = 1;
    FPS_INC = 1;
    // CELL LENGTH CONSTANTS
    MAX_CELL_LENGTH = 32;
    MIN_CELL_LENGTH = 1;
    CELL_LENGTH_INC = 2;
    GRID_LINE_LENGTH_RENDERING_THRESHOLD = 8;
    // RENDERING LOCATIONS FOR TEXT ON THE CANVAS
    FPS_X = 20;
    FPS_Y = 450;
    CELL_LENGTH_X = 20;
    CELL_LENGTH_Y = 480;
}

function initCanvas() {
    // GET THE CANVAS
    canvas = document.getElementById("game_canvas");
    // GET THE 2D RENDERING CONTEXT
    canvas2D = canvas.getContext("2d");
    // INIT THE FONT FOR TEXT RENDERED ON THE CANVAS. NOTE
    // THAT WE'LL BE RENDERING THE FRAME RATE AND ZOOM LEVEL
    // ON THE CANVAS
    canvas2D.font = "24px Arial";
    // NOTE THAT THESE DIMENSIONS SHOULD BE THE
    // SAME AS SPECIFIED IN THE WEB PAGE, WHERE
    // THE CANVAS IS SIZED
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

function initGameOfLifeData() {
    // INIT THE TIMING DATA
    timer = null;
    fps = MAX_FPS;
    frameInterval = MILLISECONDS_IN_ONE_SECOND / fps;
    // INIT THE CELL LENGTH
    cellLength = 20;
}
/*
 * This function initializes all the event handlers, registering
 * the proper response methods.
 */
function initEventHandlers() {
    canvas.onclick = respondToMouseClick;
    $("#confirmButton").click(confirmMove);
}

function respondToMouseClick(event) {
    // CALCULATE THE ROW,COL OF THE CLICK
    var canvasCoords = getRelativeCoords(event);
    var clickCol = Math.floor(canvasCoords.x / cellLength);
    var clickRow = Math.floor(canvasCoords.y / cellLength);
    if (cellNumber > 0) {
        setGridCell(renderGrid, clickRow, clickCol, LIVE_CELL + currentPlayer * 10);
        setGridCell(updateGrid, clickRow, clickCol, LIVE_CELL + currentPlayer * 10);
        cellNumber--;
    }
    //alert(cellNumber);
    renderGame();
}
/*
Comfirm Movement
Send socket to server
*/
function confirmMove() {
    updateGame();
    renderGame();
    swapGrids();
    gameGrid = renderGrid;
    updateGrid= renderGrid;
    //goto next turn
    nextTrun();
}
//goto next turn
function nextTrun() {
    //switch Player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    //Caluculate the amount of cell the current player can place
    var territory = 0;
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(gameGrid, i, j);
            if (cell === currentPlayer * 10) {
                territory++;
            }
            if (cell - currentPlayer * 10 === LIVE_CELL) {
                territory++;
            }
        }
    }
    cellNumber = 4 + territory / 5;
}

function CellType(initNumNeighbors, initCellValues) {
    this.numNeighbors = initNumNeighbors;
    this.cellValues = initCellValues;
}

function initCellLookup() {
    // WE'LL PUT ALL THE VALUES IN HERE
    cellLookup = [];
    // TOP LEFT
    var topLeftArray = new Array(1, 0, 1, 1, 0, 1);
    cellLookup[TOP_LEFT] = new CellType(3, topLeftArray);
    // TOP RIGHT
    var topRightArray = new Array(-1, 0, -1, 1, 0, 1);
    cellLookup[TOP_RIGHT] = new CellType(3, topRightArray);
    // BOTTOM LEFT
    var bottomLeftArray = new Array(1, 0, 1, -1, 0, -1);
    cellLookup[BOTTOM_LEFT] = new CellType(3, bottomLeftArray);
    // BOTTOM RIGHT
    var bottomRightArray = new Array(-1, 0, -1, -1, 0, -1);
    cellLookup[BOTTOM_RIGHT] = new CellType(3, bottomRightArray);
    // TOP
    var topArray = new Array(-1, 0, -1, 1, 0, 1, 1, 1, 1, 0);
    cellLookup[TOP] = new CellType(5, topArray);
    // BOTTOM
    var bottomArray = new Array(-1, 0, -1, -1, 0, -1, 1, -1, 1, 0);
    cellLookup[BOTTOM] = new CellType(5, bottomArray);
    // LEFT
    var leftArray = new Array(0, -1, 1, -1, 1, 0, 1, 1, 0, 1);
    cellLookup[LEFT] = new CellType(5, leftArray);
    // RIGHT
    var rightArray = new Array(0, -1, -1, -1, -1, 0, -1, 1, 0, 1);
    cellLookup[RIGHT] = new CellType(5, rightArray);
    // CENTER
    var centerArray = new Array(-1, -1, -1, 0, -1, 1, 0, 1, 1, 1, 1, 0, 1, -1, 0, -1);
    cellLookup[CENTER] = new CellType(8, centerArray);
}
/*
 * This function resets the grid containing the current state of the
 * Game of Life such that all cells in the game are dead.
 */
function resetGameOfLife() {
    // RESET ALL THE DATA STRUCTURES TOO
    gridWidth = canvasWidth / cellLength;
    gridHeight = canvasHeight / cellLength;
    updateGrid = [];
    renderGrid = [];
    gameGrid = [];
    // INIT THE CELLS IN THE GRID
    for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            setGridCell(updateGrid, i, j, DEAD_CELL);
            setGridCell(renderGrid, i, j, DEAD_CELL);
        }
    }
    // RENDER THE CLEARED SCREEN
    renderGame();
}

function updateGame() {
    // GO THROUGH THE UPDATE GRID AND USE IT TO CHANGE THE RENDER GRID
    for (var i = 0; i < gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            // HOW MANY NEIGHBORS DOES THIS CELL HAVE?
            var numLivingNeighbors = calcLivingNeighbors(i, j);
            // CALCULATE THE ARRAY INDEX OF THIS CELL
            // AND GET ITS CURRENT STATE
            var index = (i * gridWidth) + j;
            var testCell = updateGrid[index];
            if (testCell != VOID_CELL) {
                // CASES
                // 1) IT'S ALIVE
                if (testCell - currentPlayer * 10 === LIVE_CELL) {
                    // 1a FEWER THAN 2 LIVING NEIGHBORS
                    if (numLivingNeighbors < 2) {
                        // IT DIES FROM UNDER-POPULATION
                        renderGrid[index] = DEAD_CELL + 10 * currentPlayer;
                    }
                    // 1b MORE THAN 3 LIVING NEIGHBORS
                    else if (numLivingNeighbors > 3) {
                        // IT DIES FROM OVERCROWDING
                        renderGrid[index] = DEAD_CELL + 10 * currentPlayer;
                    }
                    // 1c 2 OR 3 LIVING NEIGHBORS, WE DO NOTHING
                    else {
                        renderGrid[index] = LIVE_CELL + 10 * currentPlayer;
                    }
                }
                // 2) IT'S DEAD
                else if (testCell === currentPlayer * 10) {
                    if (numLivingNeighbors === 3) {
                        renderGrid[index] = LIVE_CELL + 10 * currentPlayer;
                    }
                    else {
                        renderGrid[index] = DEAD_CELL + 10 * currentPlayer;
                    }
                }
                else {
                    if (numLivingNeighbors === 3) {
                        renderGrid[index] = LIVE_CELL + 10 * currentPlayer;
                    }
                    else {
                        renderGrid[index] = DEAD_CELL;
                    }
                }
            }
        }
    }
}

function renderGame() {
    brightGrid = [];
    // CLEAR THE CANVAS
    canvas2D.clearRect(0, 0, canvasWidth, canvasHeight);
    // RENDER THE GRID LINES, IF NEEDED
    if (cellLength >= GRID_LINE_LENGTH_RENDERING_THRESHOLD) renderGridLines();
    // RENDER THE GAME CELLS
    renderCells();
    // AND RENDER THE TEXT
    renderText();
    //renderGhosts();
    //renderVoidCell();
    // THE GRID WE RENDER THIS FRAME WILL BE USED AS THE BASIS
    // FOR THE UPDATE GRID NEXT FRAME
    //swapGrids();
}

function renderCells() {
    // SET THE PROPER RENDER COLOR
    // RENDER THE LIVE CELLS IN THE GRID
    for (var i = 0; i <= gridHeight; i++) {
        for (var j = 0; j < gridWidth; j++) {
            var cell = getGridCell(renderGrid, i, j);
            var leftNumber = Math.floor(cell / 10);
            var rightNumber = cell % 10;
            var x = j * cellLength;
            var y = i * cellLength;
            if (leftNumber > 0) {
                if (rightNumber == 0) {
                    canvas2D.fillStyle = DEAD_COLOR[leftNumber];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
                else {
                    canvas2D.fillStyle = LIVE_COLOR[leftNumber];
                    canvas2D.fillRect(x, y, cellLength, cellLength);
                }
            }
        }
    }
}

function renderGridLines() {
    // SET THE PROPER COLOR
    canvas2D.strokeStyle = GRID_LINES_COLOR;
    // VERTICAL LINES
    for (var i = 0; i < gridWidth; i++) {
        var x1 = i * cellLength;
        var y1 = 0;
        var x2 = x1;
        var y2 = canvasHeight;
        canvas2D.beginPath();
        canvas2D.moveTo(x1, y1);
        canvas2D.lineTo(x2, y2);
        canvas2D.stroke();
    }
    // HORIZONTAL LINES
    for (var j = 0; j < gridHeight; j++) {
        var x_1 = 0;
        var y_1 = j * cellLength;
        var x_2 = canvasWidth;
        var y_2 = y_1;
        canvas2D.moveTo(x_1, y_1);
        canvas2D.lineTo(x_2, y_2);
        canvas2D.stroke();
    }
}
/*
 * Renders the text on top of the grid.
 */
function renderText() {
    // SET THE PROPER COLOR
    canvas2D.fillStyle = TEXT_COLOR;
    // RENDER THE TEXT
    //canvas2D.fillText("FPS: " + fps, FPS_X, FPS_Y);
    //canvas2D.fillText("Cell Length: " + cellLength, CELL_LENGTH_X, CELL_LENGTH_Y);
    canvas2D.fillText("WarGrid Test", FPS_X, FPS_Y);
}
/*
 * We need one grid's cells to determine the grid's values for
 * the next frame. So, we update the render grid based on the contents
 * of the update grid, and then, after rending, we swap them, so that
 * the next frame we'll be progressing the game properly.
 */
function swapGrids() {
    var temp = updateGrid;
    updateGrid = renderGrid;
    renderGrid = temp;
}
/*
 * Accessor method for getting the cell value in the grid at
 * location (row, col).
 */
function getGridCell(grid, row, col) {
    // IGNORE IF IT'S OUTSIDE THE GRID
    if (!isValidCell(row, col)) {
        return -1;
    }
    var index = (row * gridWidth) + col;
    return grid[index];
}
/*
 * Mutator method for setting the cell value in the grid at
 * location (row, col).
 */
function setGridCell(grid, row, col, value) {
    // IGNORE IF IT'S OUTSIDE THE GRID
    if (!isValidCell(row, col)) {
        return;
    }
    var index = (row * gridWidth) + col;
    grid[index] = value;
}
/*
 * A cell's type determines which adjacent cells need to be tested
 * during each frame of the simulation. This method tests the cell
 * at (row, col), and returns the constant representing which of
 * the 9 different types of cells it is.
 */
function determineCellType(row, col) {
    if ((row === 0) && (col === 0)) return TOP_LEFT;
    else if ((row === 0) && (col === (gridWidth - 1))) return TOP_RIGHT;
    else if ((row === (gridHeight - 1)) && (col === 0)) return BOTTOM_LEFT;
    else if ((row === (gridHeight - 1)) && (col === (gridHeight - 1))) return BOTTOM_RIGHT;
    else if (row === 0) return TOP;
    else if (col === 0) return LEFT;
    else if (row === (gridHeight - 1)) return RIGHT;
    else if (col === (gridWidth - 1)) return BOTTOM;
    else return CENTER;
}
/*
 * This method counts the living cells adjacent to the cell at
 * (row, col). This count is returned.
 * playerNumber: int
 */
function calcLivingNeighbors(row, col) {
    var numLivingNeighbors = 0;
    // DEPENDING ON THE TYPE OF CELL IT IS WE'LL CHECK
    // DIFFERENT ADJACENT CELLS
    var cellType = determineCellType(row, col);
    var cellsToCheck = cellLookup[cellType];
    for (var counter = 0; counter < (cellsToCheck.numNeighbors * 2); counter += 2) {
        var neighborCol = col + cellsToCheck.cellValues[counter];
        var neighborRow = row + cellsToCheck.cellValues[counter + 1];
        var index = (neighborRow * gridWidth) + neighborCol;
        var neighborValue = updateGrid[index] - currentPlayer * 10;
        if (neighborValue < 10 && neighborValue != 3 && neighborValue > 0) {
            numLivingNeighbors += neighborValue;
        }
    }
    return numLivingNeighbors;
}
/*
 * This function tests to see if (row, col) represents a
 * valid cell in the grid. If it is a valid cell, true is
 * returned, else false.
 */
function isValidCell(row, col) {
    // IS IT OUTSIDE THE GRID?
    if ((row < 0) || (col < 0) || (row >= gridHeight) || (col >= gridWidth)) {
        return false;
    }
    // IT'S INSIDE THE GRID
    else {
        return true;
    }
}
// HELPER METHODS FOR THE EVENT HANDLERS
/*
 * This function gets the mouse click coordinates relative to
 * the canvas itself, where 0,0 is the top, left corner of
 * the canvas.
 */
function getRelativeCoords(event) {
    if (event.offsetX !== undefined && event.offsetY !== undefined) {
        return {
            x: event.offsetX
            , y: event.offsetY
        };
    }
    else {
        return {
            x: event.layerX
            , y: event.layerY
        };
    }
}