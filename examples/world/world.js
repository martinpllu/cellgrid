/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Thing(){}

Thing.prototype.initPosition = function(){
    var cell = grid.randomCell();
    this.cell = cell;
    cell.add(this);
}

Thing.prototype.tryToMove = function(target){
    var target = this.cell.neighbour(direction);
    if (target.contents.length == 0) {
        Grid.move(this, this.cell, target);
        this.cell = target;
    }
}

function Bumper() {
    this.initPosition();
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

mixin(Bumper, [Thing])

function Brick(cell) {
    this.color = Color.BLUE;
    this.initPosition();
}
mixin(Brick, [Thing])

var width = 10,
    height = 10,
    cellsize = 40,
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

function mixin(type, others) {
    if (!type.prototype.types) {
        type.prototype.types = []
    }
    others.forEach(function (other) {
        type.prototype.types.push(other)
        for (field in other.prototype) {
            if (other.prototype.hasOwnProperty(field)) {
                type.prototype[field] = other.prototype[field]
            }
        }
    })
}