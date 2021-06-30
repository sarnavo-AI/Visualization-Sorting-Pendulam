/************************
for(let i = 0; i < array.length - 1; i++) {
    let pos = i;
    for(let j = i + 1; j < array.length; j++) {
        if(array[pos] > array[j]) {
            pos = j;
        }
    }
    let temp = array[i];
    array[i] = array[pos];
    array[pos] = temp;
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

//let watch = new StopWatch();

let strokeWidth = sliderValue.value / 10;
let lineGap = strokeWidth * 2;

let array = [];
let arrayColor = [];
let arrayIndex = 0;

let cancelReq;

let i = 0;
let j = i + 1;
let pos = i;

arrayIndex = 0;

let startTime = 0;
let time = 0;
let temp = 0;
let cancel;

let updateState = false;

function animate() {

    for(let a = i; a < array.length - 1; a++) {

        c.clearRect(0, 0, canvas.width, canvas.height);

        if(i < array.length - 1) {
            if(array[pos] > array[j]) {
                pos = j;
                // arrayColor[j] = '#f2f2f2';
                // arrayColor[pos] = 'red';
            }
            j++;
            if(j >= array.length) {
                let temp = array[i];
                array[i] = array[pos];
                array[pos] = temp;
                //arrayColor[i] = 'green';
                i++;
                j = i + 1;
                pos = i;
            }
        }
   
        for(let i = 2; i < canvas.width; i += lineGap) {
            c.beginPath();
            c.moveTo(i, 0);
            c.lineTo(i, array[arrayIndex]);
            c.lineWidth = strokeWidth;
            c.strokeStyle = arrayColor[arrayIndex];
            c.stroke();
            arrayIndex++;
        }
        arrayIndex = 0;
    }  

    if(i >= array.length - 1) {
        clearInterval(cancelReq);
        watch.stop();
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
        stop();
        updateState = false;
        clearInterval(cancelReq);
    }

});

sliderValue.addEventListener('input', function() {
    strokeWidth = this.value / 10;
    lineGap = strokeWidth * 2;
    c.clearRect(0, 0, canvas.width, canvas.height);
    toggleBtn.textContent = 'START';
    //watch.reset();
    reset();
    generateNewArray();
});

function toggle() {
    toggleBtn.textContent = 'PAUSE';
    clearInterval(cancelReq);
    animate();
    cancelReq = setInterval(animate, 0.0001);
}

function generateNewArray() {
    array = [];
    i = 0;
    j = i + 1;
    pos = i;
    arrayIndex = 0;
    for(let i = 1; i < canvas.width; i += lineGap) {
        c.beginPath();
        c.moveTo(i, 0);
        array.push(Math.random() * canvas.height);
        arrayColor.push('#f2f2f2');
        c.lineTo(i, array[arrayIndex]);
        c.lineWidth = strokeWidth;
        c.strokeStyle = arrayColor[arrayIndex];
        c.stroke();
        arrayIndex++;
    }
    arrayLength.textContent = array.length;
}

function start() {
    startTime = Date.now();
}

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
