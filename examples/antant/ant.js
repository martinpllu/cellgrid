/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */


var Car = (function() {

  var _ = PrivateParts.createKey();

  function Car() {
    _(this).mileage = {'foo':1};
  }

  Car.prototype.getMileage = function(){
      return _(this).mileage;
  }

  return Car;
}());



function SimpleAnt(cell) {
    this.color = Color.randomColor();
    this.direction = Direction.randomDirection();
    this.cell = cell;
}

SimpleAnt.prototype.tick = function () {
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

////////////
// Engine //
////////////

var Game = (function () {

    var _ = PrivateParts.createKey();

    function Game(config) {
        _(this).display = new GridDisplay(config.cellsize, config.width, config.height);
        _(this).looping = true;
        _(this).grid = new Grid(config.width, config.height);
        _(this).numBumpers = 10000;
        _(this).bumpers = [];
    }

    Game.prototype.doTick = function () {
        var i, bumper;
        alert('hello ' + _(this).numBumpers)
        _(this).display.clear();
        for (i = 0; i < _(this).bumpers.length; i++) {
            bumper = _(this).bumpers[i];
            display.square(bumper.cell.x, bumper.cell.y, bumper.color);
        }
        for (i = 0; i < _(this).bumpers.length; i++) {
            _(this).bumpers[i].tick();
        }
        requestAnimationFrame(this.doTick);
    }

    Game.prototype.init = function () {
        var i, cell, bumper, data = _(this).data;
        for (i = 0; i < _(this).numBumpers; i++) {
            cell = _(this).grid.randomCell();
            bumper = new SimpleAnt(cell);
            _(this).bumpers.push(bumper);
            cell.add(bumper);
        }
        requestAnimationFrame(this.doTick);
    }
    
    Game.prototype.doTick_ = function(){
        alert('hello ' + _(this).numBumpers)
    }

    return Game;
}());


var config = {
    width: 500,
    height: 500,
    cellsize: 2
}
new Game(config).doTick()



