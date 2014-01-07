/*global Grid,Color,Direction,GridDisplay,Loop*/
/*jslint sloppy: true */
/*jslint plusplus: true */


function Bumper(cell) {
    this.color = Color.randomColor();
    this.direction = Direction.randomDirection();
    this.cell = cell;
}

Bumper.prototype.tick = function () {
    
    // Need to store the bumpers in the cells so you can see if they are occupied
    
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


function BumperDisplay(gridsize, numBumpers, cellsize) {
    this.bumpers = [];
    var i,
        grid,
        cell,
        bumper;
    this.gridsize = gridsize;
    this.cellsize = cellsize;
    grid = new Grid(gridsize, gridsize);
    for (i = 0; i < numBumpers; i++) {
        cell = grid.randomCell();
        bumper = new Bumper(cell);
        this.bumpers.push(bumper);
        cell.add(bumper);
    }
    this.display = new GridDisplay(cellsize, grid.width, grid.height);
}

BumperDisplay.prototype.start = function () {
    var display = this,
        loop = new Loop(this.delay, function () {
            var i, bumper;
            display.display.clear();
            for (i = 0; i < display.bumpers.length; i++) {
                bumper = display.bumpers[i];
                display.display.square(bumper.cell.x, bumper.cell.y, bumper.color);
            }
            for (i = 0; i < display.bumpers.length; i++) {
                display.bumpers[i].tick();
            }
        });
    loop.start();
};

var bumperDisplay = new BumperDisplay(300, 100*100, 2);
bumperDisplay.start();