/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Bumper(cell) {
    this.color = Color.randomColor();
    this.direction = Direction.randomDirection();
    this.cell = cell;
}

Bumper.prototype.tick = function () {
    var neighbours = this.cell.neighbours,
        i,
        target;
    for (i = 0; i < neighbours.length; i++) {
        if (neighbours[i].contents.length !== 0) {
            this.direction = Direction.randomDirection();
            break;
        }
    }
    target = this.cell.neighbour(this.direction);
    Grid.move(this, this.cell, target);
    this.cell = target;
};

var width = 500,
    height = 500,
    cellsize = 2,
    display = new GridDisplay(cellsize, width, height),
    looping = true,
    grid = new Grid(width, height),
    numBumpers = 10000,
    bumpers = [];

function doTick() {
    var i, bumper;
    display.clear();
    for (i = 0; i < bumpers.length; i++) {
        bumper = bumpers[i];
        display.square(bumper.cell.x, bumper.cell.y, bumper.color);
    }
    for (i = 0; i < bumpers.length; i++) {
        bumpers[i].tick();
    }
    requestAnimationFrame(doTick);
}

function init() {
    var i, cell, bumper;
    for (i = 0; i < numBumpers; i++) {
        cell = grid.randomCell();
        bumper = new Bumper(cell);
        bumpers.push(bumper);
        cell.add(bumper);
    }
    requestAnimationFrame(doTick);
}

init();