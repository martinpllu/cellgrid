/*global GridDisplay,Grid,console,Color*/
/*jslint sloppy: true */
/*jslint browser:true */
/*jslint plusplus: true */

//var width = 100;
//var height = 100;
//var cellsize = 5;
//var delay = 1;
var width = 500;
var height = 300;
var cellsize = 2;
var delay = 1;

var display = new GridDisplay(cellsize, width, height);

var grid = new Grid(width, height);

grid.eachCell(function (cell, x, y) {
    var initState = Math.round(Math.random());
    cell.state = initState;
    cell.initial = initState;
});

var generation = 0;
var firstFrameTimestamp = new Date().getTime();
var info = document.getElementById('info');

function updateStats() {
    generation++;
    var currentTimestamp, elapsed, averageTimeMillis, averageFps;
    currentTimestamp = new Date().getTime();
    elapsed = currentTimestamp - firstFrameTimestamp;
    averageTimeMillis = elapsed / generation;
    averageFps = 1000 / averageTimeMillis;
    if (generation % 10 === 0) {
        info.innerHTML = 'Frames/sec: ' + averageFps.toFixed(2);
    }
}

function liveNeighbours(cell) {
    var result = 0;
    cell.eachNeighbour(function (neighbour) {
        result += neighbour.state;
    });
    return result;
}

function draw() {
    display.clear();
    grid.eachCell(function (cell, x, y) {
        if (cell.state === 1) {
            display.square(x, y, Color.GREEN);
        }
        var n = liveNeighbours(cell);
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
    grid.eachCell(function (cell) {
        cell.state = cell.nextState;
    });

}

function loop() {
    setTimeout(function () {
        draw();
        updateStats();
        loop();
    }, delay);
}

loop();