/*global GridDisplay,Grid,Loop,Color,Direction,test,equal,ok,randomInt,deepEqual,js_cols*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

// For testing the output of random functions
function generateAndCheckEqual(iterations, targetArray, generatorFunction) {
    var generated = new js_cols.HashSet(),
        targetSet = new js_cols.HashSet(targetArray),
        i;
    for (i = 0; i < iterations; i++) {
        generated.insert(generatorFunction());
    }
    ok(targetSet.equals(generated), "Expected " + targetArray + " to be generated after " + i + " iterations, saw " + generated.getValues());
}

test("randomInt", function () {
    generateAndCheckEqual(1000, [0, 1, 2, 3, 4], function () {
        return randomInt(5);
    });
});

test("direction:randomDirection", function () {
    generateAndCheckEqual(1000, [0, 1, 2, 3, 4, 5, 6, 7], function () {
        return Direction.randomDirection().index;
    });
});

test("grid:eachCell", function () {
    var coords = "",
        grid = new Grid(2, 2);
    grid.eachCell(function (c) {
        coords += c;
    });
    equal(coords, "(0,0)(0,1)(1,0)(1,1)");
});

test("grid:getCell", function () {
    var grid = new Grid(2, 2),
        cell = grid.getCell(1, 0);
    equal(cell.toString(), "(1,0)");
});

function testRandomCell(grid, targetArray) {
    generateAndCheckEqual(1000, targetArray, function () {
        return grid.randomCell().toString();
    });
}

test("grid:randomCell", function () {
    var tallGrid = new Grid(2, 1),
        longGrid = new Grid(1, 2);
    testRandomCell(longGrid, ["(0,0)", "(0,1)"]);
    testRandomCell(tallGrid, ["(0,0)", "(1,0)"]);
});

test("cell:neighbours", function () {
    var grid = new Grid(8, 8),
        middleCell = grid.getCell(4, 4),
        edgeCell = grid.getCell(0, 4);
    equal(middleCell.neighbours.toString(), "(4,5),(5,5),(5,4),(5,3),(4,3),(3,3),(3,4),(3,5)");
    equal(edgeCell.neighbours.toString(), "(0,5),(1,5),(1,4),(1,3),(0,3),(7,3),(7,4),(7,5)");
});

test("cell:neighbourInDirection", function () {
    var grid = new Grid(8, 8),
        edgeCell = grid.getCell(0, 4);
    equal(edgeCell.neighbour(Direction.NORTH).toString(), "(0,5)");
    equal(edgeCell.neighbour(Direction.NORTHEAST).toString(), "(1,5)");
    equal(edgeCell.neighbour(Direction.EAST).toString(), "(1,4)");
    equal(edgeCell.neighbour(Direction.SOUTHEAST).toString(), "(1,3)");
    equal(edgeCell.neighbour(Direction.SOUTH).toString(), "(0,3)");
    equal(edgeCell.neighbour(Direction.SOUTHWEST).toString(), "(7,3)");
    equal(edgeCell.neighbour(Direction.WEST).toString(), "(7,4)");
    equal(edgeCell.neighbour(Direction.NORTHWEST).toString(), "(7,5)");
});

test("cell:eachNeighbour", function () {
    var coords = "",
        grid = new Grid(8, 8),
        edgeCell = grid.getCell(0, 4);
    edgeCell.eachNeighbour(function (n) {
        coords += n;
    });
    equal(coords, "(0,5)(1,5)(1,4)(1,3)(0,3)(7,3)(7,4)(7,5)");
});