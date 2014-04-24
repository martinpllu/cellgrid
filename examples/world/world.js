/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Bumper() {
    initPosition(this);
    this.color = Color.RED;
}

Bumper.prototype.tick = function () {
    if (!this.direction) {
        return;
    }
    var target = this.cell.neighbour(this.direction);
    if (target.contents.length == 0) {
        Grid.move(this, this.cell, target);
        this.cell = target;
    }
};

function Brick(cell) {
    this.color = Color.BLUE;
    initPosition(this);
}


function initPosition(thing) {
    var cell = grid.randomCell();
    thing.cell = cell;
    cell.add(thing);
}


var width = 10,
    height = 10,
    cellsize = 8,
    display = new GridDisplay(cellsize, width, height),
    grid = new Grid(width, height),
    things = [],
    bumper;

function doTick() {
    display.clear();
    for (i = 0; i < things.length; i++) {
        if (typeof (things[i].tick) == 'function') {
            things[i].tick();
        }
    }
    for (i = 0; i < things.length; i++) {
        thing = things[i];
        display.square(thing.cell.x, thing.cell.y, thing.color);
    }

}

window.onkeydown = function (e) {
    //    console.log(e.keyCode)
    var key = e.keyCode;
    if (key === 80 || key === 38) { // 'p' or up arrow
        bumper.direction = Direction.SOUTH;
    } else if (key === 186 || key === 40) { // ':' or down arrow
        bumper.direction = Direction.NORTH;
    } else if (key === 76 || key === 37) { // 'l' or left arrow
        bumper.direction = Direction.WEST;
    } else if (key === 222 || key === 39) { // ' or right arrow
        bumper.direction = Direction.EAST;
    } else {
        bumper.direction = null;
    }
    requestAnimationFrame(doTick);

};


function init() {
    bumper = new Bumper();
    things.push(bumper);
    things.push(new Brick());
    requestAnimationFrame(doTick);
}

init();