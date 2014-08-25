/*global Grid,Color,Direction,GridDisplay,Loop,requestAnimationFrame*/
/*jslint sloppy: true */
/*jslint plusplus: true */


function Ant(cell) {
    this.cell = cell;
    this.color = Color.randomColor();
    this.direction = Direction.randomDirection();
}

Ant.prototype.move = function (direction) {
    var target = this.cell.neighbour(direction);
    Grid.move(this, this.cell, target);
    this.cell = target;
}

var verySimpleMove = function (neighbours, direction) {
    for (var dir in neighbours) {
        if (neighbours[dir]) {
            direction = Direction.randomDirection();
            break;
        }
    }
    return {
        action: Action.MOVE,
        direction: direction
    };
}


Action = {
    MOVE: 0,
    EAT: 1
}


var x = function () {

    var width = 200,
        height = 200,
        cellsize = 5,
        display = new GridDisplay(cellsize, width, height),
        looping = true,
        grid = new Grid(width, height),
        population = 5000,
        ants = [];

    function doTick() {
        var i, j, ant;
        display.clear();
        for (i = 0; i < ants.length; i++) {
            ant = ants[i];
            display.square(ant.cell.x, ant.cell.y, ant.color);
        }
        for (i = 0; i < ants.length; i++) {
            ant = ants[i];
            var neighbours = {};
            for (j = 0; j < Direction.ALL.length; j++) {
                var dir = Direction.ALL[j];
                var neighbour = ant.cell.neighbour(dir).contents[0];
                if (neighbour) {
                    neighbours[dir] = neighbour;
                }
            }
            var action = verySimpleMove(neighbours, ant.direction);
            if (action && action.action == Action.MOVE) {
                ant.move(action.direction);
            }
        }
        requestAnimationFrame(doTick);
    }

    function init() {
        var i, cell, ant;
        for (i = 0; i < population; i++) {
            cell = grid.randomCell();
            ant = new Ant(cell);
            ants.push(ant);
            cell.add(ant);
        }
        requestAnimationFrame(doTick);
    }

    init();
}();