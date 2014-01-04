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
    var x,
        y,
        cell,
        n;
    for (x = 0; x < this.grid.width; x++) {
        for (y = 0; y < this.grid.height; y++) {
            cell = this.grid.cells[x][y];
            n = this.liveNeighbours(cell);
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
        }
    }
    for (x = 0; x < this.grid.width; x++) {
        for (y = 0; y < this.grid.height; y++) {
            cell = this.grid.cells[x][y];
            cell.state = cell.nextState;
        }
    }
};

Life.prototype.liveNeighbours = function (cell) {
    var result = 0,
        i;
    for (i = 0; i < cell.neighbours.length; i++) {
        result += cell.neighbours[i].state;
    }
    return result;
};