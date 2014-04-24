/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Thing() {}

Thing.prototype.initPosition = function (cell) {
    if (!cell){
        cell = grid.randomCell();
    }
    this.cell = cell;
    cell.add(this);
    things.push(this)
}

Thing.prototype.tryToMove = function (direction) {
    var target = this.cell.neighbour(direction);
    if (target.contents.length == 0) {
        Grid.move(this, this.cell, target);
        this.cell = target;
        return true;
    }
    return false;
}

function Hero() {
    this.initPosition();
    this.color = Color.RED;
}

Hero.prototype.tick = function () {
    if (!this.direction) {
        return;
    }
    this.tryToMove(this.direction);
    
};

Hero.prototype.postTick = function () {
    if (!this.direction) {
        return;
    }
    var target = this.cell.neighbour(this.direction);
    if (target.contents.length > 0) {
        subject = target.contents[0]
        console.log('Subject now ' + subject)
    } else {
        subject = null;
    }
}

mixin(Hero, [Thing])

function Brick(cell){
    this.color = Color.BLUE;
    this.initPosition(cell);
}

mixin(Brick, [Thing]);

function BrickLayer() {
    this.width = randomInt(width/4)
    this.color = Color.PURPLE;
    this.initPosition();
    this.direction = Direction.randomRectDirection()
    this.steps = 0;
}

BrickLayer.prototype.tick = function () {
    this.prevCell = this.cell
    this.couldMove = this.tryToMove(this.direction)
//    if (!this.couldMove){
//        this.direction = Direction.randomRectDirection()
//    }
}

BrickLayer.prototype.postTick = function(){
    if (this.couldMove){
        new Brick(this.prevCell)
    }
}
        
mixin(BrickLayer, [Thing])

var width = 100,
    height = 50,
    cellsize = 8,
    display = new GridDisplay(cellsize, width, height),
    grid = new Grid(width, height),
    things = [],
    hero,
    subject;



function doTick() {
    display.clear();
    for (i = 0; i < things.length; i++) {
        if (typeof (things[i].tick) == 'function') {
            things[i].tick();
        }
    }
    for (i = 0; i < things.length; i++) {
        if (typeof (things[i].postTick) == 'function') {
            things[i].postTick();
        }
    }

    for (i = 0; i < things.length; i++) {
        thing = things[i];
        var color = thing.color
        
        display.square(thing.cell.x, thing.cell.y, color);
    }
    if (subject) {
        var ctx = display.context;
        ctx.strokeStyle = "#FFFF00";
        ctx.lineWidth = 1
        ctx.strokeRect(subject.cell.x * cellsize, subject.cell.y * cellsize, cellsize, cellsize);

    }
}

window.onkeydown = function (e) {
    //    console.log(e.keyCode)
    var key = e.keyCode;
    if (key === 80 || key === 38) { // 'p' or up arrow
        hero.direction = Direction.SOUTH;
    } else if (key === 186 || key === 40) { // ':' or down arrow
        hero.direction = Direction.NORTH;
    } else if (key === 76 || key === 37) { // 'l' or left arrow
        hero.direction = Direction.WEST;
    } else if (key === 222 || key === 39) { // ' or right arrow
        hero.direction = Direction.EAST;
    } else {
        hero.direction = null;
    }
    requestAnimationFrame(doTick);

};


function init() {
    hero = new Hero();
    requestAnimationFrame(doTick);
    for (var i=0; i<((width*height)*0.005); i++){
        new BrickLayer();
    }
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