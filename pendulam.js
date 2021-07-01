var canvas = document.querySelector('canvas');

canvas.width = 700;
canvas.height = 480;

var c = canvas.getContext('2d');

var length = 180;
var radius = 40;
var centerX = 350;
var centerY = 50;
var positionX = 350;
var positionY = 230;

var cancelReq;

var angleDegree;
var angleRadian; 

var g = 10;
var AngularAcc = 0;
var AngularRate = 0;
var dampingConst = 0;

init();

function animate() {

    cancelReq = requestAnimationFrame(animate);

    // clearing the canvas after each time of calling
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // The ceiling
    c.beginPath();
    c.moveTo(105, 50);
    c.lineTo(600, 50);
    c.lineWidth = 10;
    c.lineCap = 'round';
    c.strokeStyle = "black";
    c.stroke();

    // to represent it as ceiling
    for(var i = 100; i <= 600 ; i += 25) {
        c.beginPath();
        c.moveTo(i, 50);
        c.lineTo(i + 20, 30);
        c.lineWidth = 2;
        c.strokeStyle = "black";
        c.stroke();
    }

    // central line
    c.beginPath()
    c.moveTo(350, 20);
    c.lineTo(350, length + 100);
    c.strokeStyle = 'grey';
    c.lineWidth = 1;
    c.stroke();

    // main calculation of Simple Pendulum
    AngularAcc = g * Math.sin(angleRadian) / length;
    AngularRate += AngularAcc / 4.2; // normalise to seconds pendulum that's why (x / 4.2)
    angleRadian -= AngularRate / 4.2;

    // Damping
    AngularRate *= dampingConst;

    var DisplayDeg = (angleRadian * 180) / Math.PI;

    document.querySelector('#angleSpan').innerHTML = DisplayDeg.toFixed(2);

    // Updating the position of center of the bob
    positionX = centerX + length * (Math.cos(Math.PI / 2 - angleRadian));
    positionY = centerY + length * (Math.sin(Math.PI / 2 - angleRadian));

    // String
    c.beginPath();
    c.moveTo(centerX, centerY);
    c.lineTo(positionX, positionY);
    c.lineWidth = 4;
    c.strokeStyle = "black";
    c.stroke();

    // Bob 
    c.beginPath();
    c.arc(positionX, positionY, radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.lineWidth = 7;
    c.stroke();
    c.fillStyle = "grey";
    c.fill();
}

document.getElementById('go').addEventListener('click', function() {
    
    length = Number(document.getElementById('length').value);
    length *= 180;
    
    angleDegree = Number(document.getElementById('angleDeg').value);
    angleRadian = ((angleDegree * Math.PI) / 180)

    dampingConst = Number(document.getElementById('damping').value);
    dampingConst = 1 - dampingConst;

    g = 10;
    AngularRate = 0;
    AngularAcc = 0;

    window.cancelAnimationFrame(cancelReq);
    animate();

    watch.reset();
    watch.stop();
    watch.start();
});

document.getElementById('pause').addEventListener('click', function() {
    window.cancelAnimationFrame(cancelReq);
    watch.stop();
});

document.getElementById('play').addEventListener('click', function() {
    window.cancelAnimationFrame(cancelReq);
    animate();
    watch.start();
});


class StopWatch {
    constructor() {

        var initTime = 0;
        var tempTime = 0;
        var totalTime = 0;
        var cancelInterval;

        var update = function () {
            tempTime = Date.now();
            // console.log(tempTime);
            totalTime += (tempTime - initTime);
            console.log(totalTime);
            initTime = tempTime;
            format();
        };

        var format = function () {
            var tempTotalTime = totalTime;
            var milliSec = tempTotalTime % 1000;
            tempTotalTime = Math.floor(tempTotalTime / 1000);
            var sec = tempTotalTime % 60;
            tempTotalTime = Math.floor(tempTotalTime / 60);
            var min = tempTotalTime % 60;

            if (min < 10) {
                min = '0' + min;
            }

            if (sec < 10) {
                sec = '0' + sec;
            }

            if (milliSec < 10) {
                milliSec = '00' + milliSec;
            }
            else if (milliSec < 100) {
                milliSec = '0' + milliSec;
            }

            document.getElementById('timeSpan').innerHTML = ( /*hr + ' : ' + */min + ' : ' + sec + ' . ' + milliSec);
        };

        this.start = function () {
            initTime = Date.now();
            cancelInterval = setInterval(update, 10);
        };

        this.stop = function () {
            clearInterval(cancelInterval);
        };

        this.reset = function () {
            totalTime = 0;
        };
    }
}

var watch = new StopWatch();

function init() {
    // The ceiling
    c.beginPath();
    c.moveTo(105, 50);
    c.lineTo(600, 50);
    c.lineWidth = 10;
    c.lineCap = 'round';
    c.strokeStyle = "black";
    c.stroke();

    // to represent it as ceiling
    for(var i = 100; i <= 600 ; i += 25) {
        c.beginPath();
        c.moveTo(i, 50);
        c.lineTo(i + 20, 30);
        c.lineWidth = 2;
        c.strokeStyle = "black";
        c.stroke();
    }

    // central line
    c.beginPath()
    c.moveTo(350, 20);
    c.lineTo(350, length + 100);
    c.strokeStyle = 'grey';
    c.lineWidth = 1;
    c.stroke();

    // String
    c.beginPath();
    c.moveTo(centerX, centerY);
    c.lineTo(positionX, positionY);
    c.lineWidth = 4;
    c.strokeStyle = "black";
    c.stroke();

    // Bob 
    c.beginPath();
    c.arc(positionX, positionY, radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.lineWidth = 7;
    c.stroke();
    c.fillStyle = "grey";
    c.fill();

}