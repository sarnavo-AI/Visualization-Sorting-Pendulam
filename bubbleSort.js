/************************
for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length - i - 1; j++) {
        if(array[j] > array[j + 1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = array[j];
        }
    }
}
*************************/

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const generateArray = document.getElementById('array-generate');
const toggleBtn = document.getElementById('toggle-btn');
const sliderValue = document.getElementById('range-value');
const arrayLength = document.getElementById('array-number');
const stopWatch = document.getElementById('time');

canvas.height = 450;
canvas.width = 700;

let sortingRate = 40;

let strokeWidth = sliderValue.value / 10;
let lineGap = strokeWidth * 2;
let strokeColor = "#F2F2F2";

let array = [];
let arrayIndex = 0;

let cancelReq;

let i = 0;
let j = 0;

arrayIndex = 0;

let startTime = 0;
let time = 0;
let temp = 0;
let cancel;

let updateState = false;

function animate() {

    for(let sort = i; sort < array.length; sort += sortingRate) {

        c.clearRect(0, 0, canvas.width, canvas.height);

        if(i < array.length) {
            if(j < array.length - i - 1) {
                if(array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
                j++;
            } 

            if(j >= array.length - i - 1) {
                j = 0;
                i++;
            }
        }
   
        for(let i = 2; i < canvas.width; i += lineGap) {
            c.beginPath();
            c.moveTo(i, 0);
            c.lineTo(i, array[arrayIndex]);
            c.lineWidth = strokeWidth;
            c.strokeStyle = strokeColor;
            c.stroke();
            arrayIndex++;
        }
        arrayIndex = 0;
    }  

    if(i >= array.length) {
        clearInterval(cancelReq);
    } 
    if(updateState) {
        update();
    } 
}

generateArray.addEventListener('click', () => {
    clearInterval(cancelReq);
    c.clearRect(0, 0, canvas.width, canvas.height);
    toggleBtn.textContent = 'START';
    generateNewArray();
    //watch.reset();
    reset();
});

toggleBtn.addEventListener('click', () => {
    if(toggleBtn.textContent == 'START') {
        toggle();
        //watch.reset();
        //watch.start();
        reset();
        start();
        updateState = true;
    }
    else if(toggleBtn.textContent == 'PLAY') {
        toggle();
        start();
        updateState = true;
    }
    else {
        toggleBtn.textContent = 'PLAY';
        //watch.stop();
        updateState = false;
        clearInterval(cancelReq);
    }

});

sliderValue.addEventListener('input', function() {
    strokeWidth = this.value / 10;
    lineGap = strokeWidth * 2;
    c.clearRect(0, 0, canvas.width, canvas.height);
    toggleBtn.textContent = 'START';
    clearInterval(cancelReq);
    reset();
    generateNewArray();
});

function toggle() {
    toggleBtn.textContent = 'PAUSE';
    clearInterval(cancelReq);
    animate();
    cancelReq = setInterval(animate, 0.1);
}

function generateNewArray() {
    array = [];
    i = 0;
    j = 0;
    arrayIndex = 0;
    for(let i = 1; i < canvas.width; i += lineGap) {
        c.beginPath();
        c.moveTo(i, 0);
        array.push(Math.random() * canvas.height);
        c.lineTo(i, array[arrayIndex]);
        c.lineWidth = strokeWidth;
        c.strokeStyle = strokeColor;
        c.stroke();
        arrayIndex++;
    }
    arrayLength.textContent = array.length;
}

function start() {
    startTime = Date.now();
}
/*
function stop() {
clearInterval(cancel);
}
*/
function reset() {
    time = 0;
    stopWatch.innerHTML = `00 : 00 . 000`;
}

function transform() {
    let date = new Date(time);
    let millisec = date.getMilliseconds();
    let sec = date.getSeconds();
    let min = date.getMinutes();

    if(millisec < 10) { 
        millisec = '00' + millisec;
    }

    if(millisec < 100)  {
        millisec = '0' + millisec;
    }

    if(sec < 10) {
        sec = '0' + sec;
    }

    if(min < 10) {
        min = '0' + min;
    }

    stopWatch.innerHTML = `${min} : ${sec} . ${millisec}`;        
}

function update() {
    temp = Date.now();
    time += (temp - startTime);
    startTime = temp;
    transform();
}

