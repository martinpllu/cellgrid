/*global GridDisplay,Grid,Loop,Color,Direction,Life,test,equal,ok,randomInt,deepEqual,expect,js_cols,console,QUnit*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

QUnit.config.testTimeout = 100000;

// For testing that random functions produce the expected set of values given enough iterations
function expectedValuesGenerated(iterations, expectedValues, generatorFunction) {
    var generated = new js_cols.HashSet(),
        targetSet = new js_cols.HashSet(expectedValues),
        i;
    for (i = 0; i < iterations; i++) {
        generated.insert(generatorFunction());
    }
    ok(targetSet.equals(generated), "Expected " + expectedValues + " to be generated after " + i + " iterations, saw " + generated.getValues());
}

test("randomInt", function () {
    expectedValuesGenerated(1000, [0, 1, 2, 3, 4], function () {
        return randomInt(5);
    });
});

test("direction:randomDirection", function () {
    expectedValuesGenerated(1000, [0, 1, 2, 3, 4, 5, 6, 7], function () {
        return Direction.randomDirection().index;
    });
});

test("grid:cell", function () {
    var grid = new Grid(2, 2),
        cell = grid.cell(1, 0);
    equal(cell.toString(), "(1,0)");
});

function testRandomCell(grid, targetArray) {
    expectedValuesGenerated(1000, targetArray, function () {
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
        middleCell = grid.cell(4, 4),
        edgeCell = grid.cell(0, 4);
    equal(middleCell.neighbours.toString(), "(4,5),(5,5),(5,4),(5,3),(4,3),(3,3),(3,4),(3,5)");
    equal(edgeCell.neighbours.toString(), "(0,5),(1,5),(1,4),(1,3),(0,3),(7,3),(7,4),(7,5)");
});

test("cell:neighbourInDirection", function () {
    var grid = new Grid(8, 8),
        edgeCell = grid.cell(0, 4);
    equal(edgeCell.neighbour(Direction.NORTH).toString(), "(0,5)");
    equal(edgeCell.neighbour(Direction.NORTHEAST).toString(), "(1,5)");
    equal(edgeCell.neighbour(Direction.EAST).toString(), "(1,4)");
    equal(edgeCell.neighbour(Direction.SOUTHEAST).toString(), "(1,3)");
    equal(edgeCell.neighbour(Direction.SOUTH).toString(), "(0,3)");
    equal(edgeCell.neighbour(Direction.SOUTHWEST).toString(), "(7,3)");
    equal(edgeCell.neighbour(Direction.WEST).toString(), "(7,4)");
    equal(edgeCell.neighbour(Direction.NORTHWEST).toString(), "(7,5)");
});

test("cell:randomNeighbour", function () {
    var grid = new Grid(8, 8),
        edgeCell = grid.cell(0, 4),
        target = ["(0,5)", "(1,5)", "(1,4)", "(1,3)", "(0,3)", "(7,3)", "(7,4)", "(7,5)"];
    expectedValuesGenerated(1000, target, function () {
        return edgeCell.randomNeighbour().toString();
    });
});

test("perf:grid:bigTest", function () {
    var size = 1000,
        constructionStartTime = new Date().getTime(),
        grid = new Grid(size, size),
        constructionTime = new Date().getTime() - constructionStartTime,
        iterateStartTime,
        iterateTime,
        x,
        y,
        i,
        cell,
        neighbour;
    ok(true, constructionTime + "ms to build " + size + "x" + size + " grid");
    iterateStartTime = new Date().getTime();

    for (x = 0; x < grid.width; x++) {
        for (y = 0; y < grid.height; y++) {
            cell = grid.cells[x][y];
            for (i = 0; i < 8; i++) {
                neighbour = cell.neighbours[i];
            }
        }
    }
    iterateTime = new Date().getTime() - iterateStartTime;
    ok(true, iterateTime + "ms to iterate over all cells, getting neighbours");
});

function sampleElapsedTime(numSamples, sampleFunction) {
    var i,
        elapsedTime,
        startTime = new Date().getTime();
    for (i = 0; i < numSamples; i++) {
        sampleFunction();
    }
    elapsedTime = new Date().getTime() - startTime;
    return elapsedTime / numSamples;
}

function lifeFrameRateTest(size, numTicks) {
    var life = new Life(size, size),
        i,
        elapsedTime,
        startTime = new Date().getTime();
    life.init();
    for (i = 0; i < numTicks; i++) {
        life.tick();
    }
    elapsedTime = new Date().getTime() - startTime;
    return elapsedTime / numTicks;
}

test("perf:grid:lifeFrameRateTest", function () {
    var numSamples = 1,
        numTicksPerSample = 100,
        size = 500,
        totalTime = 0,
        averageTime,
        fps,
        i;
    for (i = 0; i < numSamples; i++) {
        totalTime += lifeFrameRateTest(500, numTicksPerSample);
    }
    averageTime = totalTime / numSamples;
    fps = 1000 / averageTime;

    ok(true, averageTime.toFixed(2) + "ms average tick time over " + numSamples + " " + size + "x" + size + " samples of " + numTicksPerSample + " ticks each (" + fps.toFixed(2) + " frames/sec)");
});