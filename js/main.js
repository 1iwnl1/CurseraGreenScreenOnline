function makeGray() {
    for (var pixel of fgImage.values()) {
        var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    var imgcanvas = document.getElementById("canvas1");
    fgImage.drawTo(imgcanvas);
}

function loadForegroundImage() {
    var imgFile = document.getElementById("fgfile");
    fgImage = new SimpleImage(imgFile);
    var canvas = document.getElementById("canvas1");
    fgImage.drawTo(canvas);
}

function loadBackgroundImage() {
    var imgFile = document.getElementById("bgfile");
    bgImage = new SimpleImage(imgFile);
    var canvas = document.getElementById("canvas2");
    bgImage.drawTo(canvas);
}

function clearCanvas() {
    var context = canvas1.getContext("2d");
    context.clearRect(0,0,canvas1.width,canvas1.height);
    console.log(canvas1.width,canvas1.height)
    context = canvas2.getContext("2d");
    context.clearRect(0,0,canvas2.width,canvas2.height);
}

function doGreenScreen() {
    if (fgImage == null || ! fgImage.complete()) {
        alert("foreground not loaded");
        return;
    }
    if (bgImage == null || ! bgImage.complete()) {
        alert("background not loaded");
    }
    clearCanvas();

    var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());

    for (var pixel of fgImage.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        if (pixel.getGreen() > pixel.getBlue()+pixel.getRed()) {
            var bgPixel = bgImage.getPixel(x,y);
            output.setPixel(x,y,bgPixel);
        } else {
            output.setPixel(x,y,pixel);
        }
    }
    output.drawTo(canvas1);
}


var fgImage = null;
var bgImage = null;
var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

canvas1.width = 500;
canvas1.height = 500;
canvas2.width = 500;
canvas2.height = 500;



