/*jslint plusplus: true */
/*jslint sloppy: true */

function randomInt(upToButExcluding) {
    return Math.floor(Math.random() * upToButExcluding);
}

function Direction(x, y, index, id) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.id = id;
}

Direction.NORTH = new Direction(0, 1, 0, "NORTH");
Direction.NORTHEAST = new Direction(1, 1, 1, "NORTHEAST");
Direction.EAST = new Direction(1, 0, 2, "EAST");
Direction.SOUTHEAST = new Direction(1, -1, 3, "SOUTHEAST");
Direction.SOUTH = new Direction(0, -1, 4, "SOUTH");
Direction.SOUTHWEST = new Direction(-1, -1, 5, "SOUTHWEST");
Direction.WEST = new Direction(-1, 0, 6, "WEST");
Direction.NORTHWEST = new Direction(-1, 1, 7, "NORTHWEST");

Direction.ALL = [
    Direction.NORTH,
    Direction.NORTHEAST,
    Direction.EAST,
    Direction.SOUTHEAST,
    Direction.SOUTH,
    Direction.SOUTHWEST,
    Direction.WEST,
    Direction.NORTHWEST];

Direction.randomDirection = function () {
    return Direction.ALL[randomInt(8)];
};

function Cell(grid, x, y) {
    this.grid = grid;
    this.contents = [];
    this.x = x;
    this.y = y;
}

Cell.prototype.initNeighbours = function () {
    this.neighbours = [];
    var i, direction, nx, ny, neighbour;
    for (i = 0; i < Direction.ALL.length; i++) {
        direction = Direction.ALL[i];
        nx = this.x + direction.x;
        ny = this.y + direction.y;
        if (nx === this.grid.width) {
            nx = 0;
        } else if (nx === -1) {
            nx = this.grid.width - 1;
        }
        if (ny === this.grid.height) {
            ny = 0;
        } else if (ny === -1) {
            ny = this.grid.height - 1;
        }
        neighbour = this.grid.cells[nx][ny];
        this.neighbours[i] = neighbour;
    }
};

Cell.prototype.toString = function () {
    return "(" + this.x + ',' + this.y + ")";
};

Cell.prototype.randomNeighbour = function () {
    return this.neighbours[randomInt(8)];
};

Cell.prototype.neighbour = function (direction) {
    return this.neighbours[direction.index];
};

Cell.prototype.add = function (o) {
    this.contents.push(o);
};

Cell.prototype.remove = function (o) {
    var index = this.contents.indexOf(o);
    if (index !== -1) {
        this.contents.splice(index, 1);
        return true;
    }
    return false;
};

function Grid(width, height) {

    var x, y, column;

    this.width = width;
    this.height = height;
    this.cells = [];

    for (x = 0; x < width; x++) {
        column = [];
        this.cells[x] = column;
    }
    for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
            this.cells[x][y] = new Cell(this, x, y);
        }
    }
    for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
            this.cells[x][y].initNeighbours();
        }
    }
}

Grid.prototype.randomCell = function () {
    var x = randomInt(this.width),
        y = randomInt(this.height);
    return this.cells[x][y];
};

Grid.prototype.cell = function (x, y) {
    return this.cells[x][y];
};

Grid.move = function (obj, fromCell, toCell) {
    var removed = fromCell.remove(obj);
    if (!removed) {
        throw "Object not found in 'from' cell";
    }
    toCell.add(obj);
};