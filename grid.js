function Grid(width, height) {

	this.width = width
	this.height = height
	this.cells = new Array(width)

	for ( var x = 0; x < width; x++) {
		var col = new Array(height)
		this.cells[x] = col
	}
	for ( var x = 0; x < this.width; x++) {
		for ( var y = 0; y < this.height; y++) {
			this.cells[x][y] = new Cell(this, x, y)
		}
	}
	this.eachCell(function(cell) {
		cell.initNeighbours()
	})
}

function Direction(x, y) {
	this.x = x
	this.y = y
}

Direction.NONE = new Direction(0, 0)
Direction.NORTH = new Direction(0, 1)
Direction.NORTHEAST = new Direction(1, 1)
Direction.EAST = new Direction(1, 0)
Direction.SOUTHEAST = new Direction(1, -1)
Direction.SOUTH = new Direction(0, -1)
Direction.SOUTHWEST = new Direction(-1, -1)
Direction.WEST = new Direction(-1, 0)
Direction.NORTHWEST = new Direction(-1, 1)

Direction.ALL = [ Direction.NORTH, Direction.NORTHEAST, Direction.EAST,
		Direction.SOUTHEAST, Direction.SOUTH, Direction.SOUTHWEST,
		Direction.WEST, Direction.NORTHWEST ]

Direction.randomDirection = function() {
	return Direction.ALL[randomInt(7)]
}

Grid.prototype.randomCell = function() {
	x = randomInt(this.width) - 1
	y = randomInt(this.width) - 1
	return this.getCell(x, y)
}

Grid.prototype.getCell = function(x, y) {
	return this.cells[x][y]
}

Grid.prototype.eachCell = function(f) {
	for ( var x = 0; x < this.width; x++) {
		for ( var y = 0; y < this.height; y++) {
			var cell = this.getCell(x, y)
			f(cell, x, y)
		}
	}
}

function Cell(grid, x, y) {
	this.grid = grid
	this.x = x
	this.y = y
}

Cell.prototype.initNeighbours = function() {
	this.neighbours = []
	for ( var i = 0; i < Direction.ALL.length; i++) {
		var direction = Direction.ALL[i]
		var nx = this.x + direction.x
		var ny = this.y + direction.y
		if (nx == this.grid.width) {
			nx = 0
		} else if (nx == -1) {
			nx = this.grid.width - 1
		}
		if (ny == this.grid.height) {
			ny = 0
		} else if (ny == -1) {
			ny = this.grid.height - 1
		}
		var neighbour = this.grid.getCell(nx, ny)
		this.neighbours[i] = neighbour
	}
}

Cell.prototype.toString = function() {
	return this.x + ',' + this.y
}

Cell.prototype.randomNeighbour = function() {
	return this.neighbours[randomInt(8)]
}

Cell.prototype.eachNeighbour = function(f) {
	for ( var i = 0; i < 8; i++) {
		f(this.neighbours[i])
	}
}

function randomInt(max) {
	return Math.floor(Math.random() * max + 1)
}
