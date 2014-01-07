/*global GridDisplay,Grid,Color,Life,requestAnimationFrame,cancelAnimationFrame*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

var width = 500,
    height = 500,
    cellsize = 2,
    life = new Life(width, height),
    grid = life.grid,
    display = new GridDisplay(cellsize, width, height),
    animationId,
    looping = true;

function draw() {
    var cell,
        x,
        y;
    display.clear();
    for (x = 0; x < width; x++) {
        for (y = 0; y < height; y++) {
            cell = grid.cells[x][y];
            if (cell.state === 1) {
                display.square(x, y, Color.GREEN);
            }
        }
    }
}

function doTick() {
    draw();
    life.tick();
    if (looping) {
        animationId = requestAnimationFrame(doTick);
    }
}

window.onkeyup = function (e) {
    var key = e.keyCode || e.which;
    if (key === 32) { // Space: toggle looping
        if (looping) {
            cancelAnimationFrame(animationId);
        } else {
            requestAnimationFrame(doTick);
        }
        looping = !looping;
    }
    if (key === 78 && !looping) { // n: Next frame if not looping
        doTick();
    }
};

requestAnimationFrame(doTick);