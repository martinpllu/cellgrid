class GridDisplay {

    public context: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public gridLab: GridLab;

    constructor(public cellsize, public width, public height) {
        this.canvas = <HTMLCanvasElement>document.getElementById('display');
        this.canvas.innerHTML = '';
	    this.canvas.setAttribute("width", (cellsize * width).toString()); 
    	this.canvas.setAttribute("height", (cellsize * height).toString());
        this.context = this.canvas.getContext('2d');
        this.initKeyHandlers();
    }

    private initKeyHandlers() {
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
    }

    public clear() {
        this.context.fillStyle = Color.BLACK;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    

}

class Color {

    static RED = "#FF0000";
    static GREEN = "#00FF00";
    static BLUE = "#0000FF";
    static BLACK = "#000000";
    static WHITE = "#000000";
    static YELLOW = "#FFFF00";
    static PURPLE = "#FF00FF";

    public static randomColor(): String {
        // From http://www.paulirish.com/2009/random-hex-color-code-snippets/
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


}    
