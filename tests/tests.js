/*global GridDisplay,Grid,Loop,Color,Direction,test,equal,ok,randomInt,deepEqual,js_cols*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

test("randomInt", function () {
    var i, n,
        results = [0, 0, 0, 0, 0];
    for (i = 0; i < 1000; i++) {
        n = randomInt(5);
        results[n] = 1;
    }
    deepEqual(results, [1, 1, 1, 1, 1]);
});


test("direction:randomDirection", function () {
    var target = new js_cols.HashSet([0, 1, 2, 3, 4, 5, 6, 7]),
        generated = new js_cols.HashSet(),
        i = 0,
        dir,
        maxTries = 1000;
    while (i < maxTries && !target.equals(generated)) {
        generated.insert(Direction.randomDirection().index);
        console.log(generated.getValues());
    }
    ok(target.equals(generated));
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

function testRandomCell(grid) {
    var i, cell;
    for (i = 0; i < 100; i++) {
        cell = grid.randomCell();
        ok(cell.x >= 0 && cell.x <= grid.width);
        ok(cell.y >= 0 && cell.y <= grid.height);
        // TODO test that all the cells are covered
        // ... keep going until all are found
    }
}




function keepGoingUntilAllGenerated(target, maxTries, generatorFunction) {
    var tries = 0,
        maxTries,
        result;
    while (tries < maxTries) {
        if (target == result) {
            break;
        }
        result = generatorFunction();

    }
}

test("grid:randomCell", function () {
    var tallGrid = new Grid(2, 10),
        longGrid = new Grid(10, 2);
    testRandomCell(longGrid);
    testRandomCell(tallGrid);
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