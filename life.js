/*global Grid*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Life(width, height) {
    var x, y;
    this.grid = new Grid(width, height);
    this.init();
}

Life.prototype.init = function () {
    this.grid.eachCell(function (cell, x, y) {
        var initState = Math.round(Math.random());
        cell.state = initState;
        cell.initial = initState;
    });
};

Life.prototype.tick = function () {
    var life = this;
    this.grid.eachCell(function (cell, x, y) {
        var n = life.liveNeighbours(cell);
        if (cell.state === 1) {
            if (n < 2) {
                cell.nextState = 0;
            } else if (n > 3) {
                cell.nextState = 0;
            } else {
                cell.nextState = 1;
            }
        } else if (cell.state === 0) {
            if (n === 3) {
                cell.nextState = 1;
            } else {
                cell.nextState = 0;
            }
        }
    });
    this.grid.eachCell(function (cell) {
        cell.state = cell.nextState;
    });
};

Life.prototype.liveNeighbours = function (cell) {
    var result = 0;
    cell.eachNeighbour(function (neighbour) {
        result += neighbour.state;
    });
    return result;
};