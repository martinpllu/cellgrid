var width = 100
var height = 100
var cellsize = 5

var display = new GridDisplay(cellsize, width, height);

var grid = new Grid(width, height)

grid.eachCell(function (cell, x, y) {
    var initState = Math.round(Math.random())
    cell.state = initState
    cell.initial = initState
})

var generation = 0
var firstFrameTimestamp = new Date().getTime()

function loop () {          
   setTimeout(function () {   
       draw()
       updateStats()
       loop();
   }, 1)
};

loop();

function updateStats() {
    generation++
    var currentTimestamp = new Date().getTime()
    var elapsed = currentTimestamp - firstFrameTimestamp
    var averageTimeMillis = elapsed / generation
    var averageFps = 1000 / averageTimeMillis
    if (generation % 10 == 0) {
        console.log(averageFps.toFixed(2))
    }
}

function draw() {
    display.clear();
    grid.eachCell(function (cell, x, y) {
        if (cell.state == 1) {
            display.square(x, y, Color.GREEN);
        }
        var n = liveNeighbours(cell)
        if (cell.state == 1) {
            if (n < 2) cell.nextState = 0
            else if (n > 3) cell.nextState = 0
            else cell.nextState = 1
        } else if (cell.state == 0) {
            if (n == 3) cell.nextState = 1
            else cell.nextState = 0
        }
    })
    grid.eachCell(function (cell) {
        cell.state = cell.nextState
    })

}


function liveNeighbours(cell) {
    result = 0
    cell.eachNeighbour(function (neighbour) {
        result += neighbour.state
    })
    return result
}