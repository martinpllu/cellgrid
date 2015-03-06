/*global GridDisplay,Grid,Color,Life,requestAnimationFrame,cancelAnimationFrame*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

var width = 300,
    height = 300,
    cellsize = 2,
    life = new Life(width, height),
    grid = life.grid,
    display = new GridDisplay(cellsize, width, height),
    looping = true;

function draw() {
    var cell, i;
    display.clear();
    for (i = 0; i < this.grid.numCells; i++) {
        cell = this.grid.flatCells[i];
        if (cell.state === 1) {
            display.square(cell.x, cell.y, Color.GREEN);
        }
    }
}

function doTick() {
    draw();
    life.tick();
    if (looping) {
        requestAnimationFrame(doTick);
    }
}

window.onkeyup = function (e) {
    var key = e.keyCode || e.which;
    if (key === 32) { // Space: toggle looping
        looping = !looping;
        if (looping) {
            requestAnimationFrame(doTick);
        }
    }
    if (key === 78 && !looping) { // n: Next frame if not looping
        doTick();
    }
};

requestAnimationFrame(doTick);