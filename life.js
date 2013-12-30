new Processing("canvas", sketch);

function sketch(pr) {

    var grid	
	var looping = true
	var generation = 0
	var firstFrameTimestamp = 0
	
	var width = 100
	var height = 100
	var CELLSIZE = 5

	pr.setup = function() {
		pr.size(width*CELLSIZE, height*CELLSIZE)
		pr.noStroke()
		pr.randomSeed(100)
		grid = new Grid(width, height)
		grid.eachCell(function(cell, x, y){
			var initState = Math.round(pr.random(0, 1))
			cell.state = initState
			cell.initial = initState
		})
	}
	
	pr.mousePressed = function(){
		if (looping){
			pr.noLoop()
		}
		else {
			pr.loop()
		}
		looping = !looping
	}

	
	pr.mouseMoved = function() {
		var x = pr.mouseX
		var y = pr.mouseY
		var pixelWidth = width * CELLSIZE
		var pixelHeight = height * CELLSIZE
		if (x < pixelWidth && y < pixelHeight) {
			var gridX = Math.floor(x / CELLSIZE)
			var gridY = Math.floor(y / CELLSIZE)
			var cell = grid.cells[gridX][gridY]
			console.log('[' + gridX+ ',' + gridY + ']')
		}
	}
	
	pr.draw = function() {
		if (firstFrameTimestamp == 0){
			firstFrameTimestamp = new Date().getTime()
		}
		grid.eachCell(function(cell, x, y){
			var colour = cell.state
            if (colour == 1) colour = 255
            pr.fill(colour)
            pr.rect(x*5,y*5,5,5)
            var n = liveNeighbours(cell)
            if (cell.state == 1){
            	if (n < 2) cell.nextState = 0
            	else if (n > 3) cell.nextState = 0
            	else cell.nextState = 1
            }
            else if (cell.state == 0){
            	if (n == 3) cell.nextState = 1
            	else cell.nextState = 0
            }
		})
		grid.eachCell(function(cell){
			cell.state = cell.nextState
		})
		generation++
		var currentTimestamp = new Date().getTime()
		var elapsed = currentTimestamp - firstFrameTimestamp
		var averageTimeMillis = elapsed / generation
		var averageFps = 1000 / averageTimeMillis
		if (generation % 10 == 0){
			console.log(averageFps.toFixed(2))
		}
	}
	
	
	function liveNeighbours(cell){
		result = 0
		cell.eachNeighbour(function(neighbour){
			result += neighbour.state
		})
		return result
	}
	
	
}


