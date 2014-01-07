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

Color.randomColor = function () {
    // From http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

function GridDisplay(cellsize, width, height) {
    this.cellsize = cellsize;
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById('canvas');
    this.canvas.setAttribute("width", (cellsize * width).toString());
    this.canvas.setAttribute("height", (cellsize * height).toString());
    this.context = this.canvas.getContext('2d');
}

GridDisplay.prototype.clear = function () {
    this.context.fillStyle = Color.BLACK;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

GridDisplay.prototype.square = function (x, y, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x * this.cellsize, y * this.cellsize, this.cellsize, this.cellsize);
};


// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'],
        x;
    for (x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());