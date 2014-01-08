/*global Grid*/
/*jslint sloppy: true */
/*jslint plusplus: true */

function Life(width, height) {
    var x, y;
    this.grid = new Grid(width, height);
    this.init();
}

Life.prototype.init = function () {
    var cell, initState, i;
    for (i = 0; i < this.grid.numCells; i++) {
        cell = this.grid.flatCells[i];
        cell.state = Math.round(Math.random());
    }
};

Life.prototype.tick = function () {
    var i, cell, n;
    for (i = 0; i < this.grid.numCells; i++) {
        cell = this.grid.flatCells[i];
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
    for (i = 0; i < this.grid.numCells; i++) {
        cell = this.grid.flatCells[i];
        cell.state = cell.nextState;
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