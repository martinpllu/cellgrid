/*global GridDisplay,Grid,Loop,Color,Life*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */


function LifeDisplay(life, cellsize, delay) {
    this.life = life;
    this.cellsize = cellsize;
    this.delay = delay;
    this.display = new GridDisplay(cellsize, life.grid.width, life.grid.height);
}

LifeDisplay.prototype.start = function () {
    var lifeDisplay = this,
        grid = this.life.grid,
        loop = new Loop(this.delay, function () {
            var cell,
                x,
                y;
            lifeDisplay.display.clear();
            for (x = 0; x < grid.width; x++) {
                for (y = 0; y < grid.height; y++) {
                    cell = grid.cells[x][y];
                    if (cell.state === 1) {
                        lifeDisplay.display.square(x, y, Color.GREEN);
                    }
                }
            }
            lifeDisplay.life.tick();
        });
    loop.start();
};

var life = new Life(500, 500);
var lifeDisplay = new LifeDisplay(life, 2, 1);
lifeDisplay.start();