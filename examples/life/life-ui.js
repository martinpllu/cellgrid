/*global GridDisplay,Grid,Loop,Color,Life,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */


var width = 500,
    height = 500,
    cellsize = 2,
    life = new Life(width, height),
    grid = life.grid,
    display = new GridDisplay(cellsize, width, height);

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
    life.tick();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);