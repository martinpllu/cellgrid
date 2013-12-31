/*jslint browser:true */
/*jslint sloppy: true */

function Color() {}

Color.RED = "#FF0000";
Color.GREEN = "#00FF00";
Color.BLUE = "#0000FF";
Color.BLACK = "#000000";
Color.WHITE = "#FFFFFF";
Color.YELLOW = "#FFFF00";
Color.PURPLE = "#FF00FF";

function GridDisplay(cellsize, width, height) {
    this.cellsize = cellsize;
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById('canvas');
    this.canvas.setAttribute("width", (cellsize * width).toString());
    this.canvas.setAttribute("height", (cellsize * height).toString());
    this.context = this.canvas.getContext('2d');
    //        this.initKeyHandlers();
}

//function initKeyHandlers() {
//        window.onkeyup = function(e) {
//            var key = e.keyCode ? e.keyCode : e.which;
//            if (key == 32) { // Space
//                this.gridLab.toggleLooping();
//            }
//            if (key == 38) { // Up arrow
//                this.gridLab.loopInterval = Math.min(this.gridLab.loopInterval - 5, 0);
//            }
//            if (key == 40) { // Down arrow
//                this.gridLab.loopInterval += 5;
//            }
//        }
//}

GridDisplay.prototype.clear = function () {
    this.context.fillStyle = Color.BLACK;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

GridDisplay.prototype.square = function (x, y, color) {
    this.context.fillStyle = color;
    //console.log('Filling ' + color + ' at  ' + x + ',' + y)
    this.context.fillRect(x * this.cellsize, y * this.cellsize, this.cellsize, this.cellsize);
};



Color.randomColor = function () {
    // From http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};