const timerElement = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const lapListContainer = document.getElementById('lapList');
const lapCounterSpan = document.getElementById('lapCounter');

let timerCount = 0;
let intervalTimer;
let lapCount = 1;
let lapArr = []

const startTimer = () => {
    timerElement.innerHTML = timerCount++
    intervalTimer = setInterval(() => {
        timerElement.innerHTML = timerCount++
    }, 1000)
}

const pauseTimer = () => {
    clearInterval(intervalTimer)
}

const resetTimer = () => {
    timerElement.innerHTML = '0'
    timerCount = 0
    clearInterval(intervalTimer)
}


const clearLaps = () => {
    lapCount = 0;
    lapCounterSpan.innerHTML = `${lapCount} laps`
    lapArr = []
    console.log(lapArr)
    lapListContainer.innerHTML = '<li class="lap-empty">No laps recorded</li>'
    return showLaps(lapArr)
}
const saveLap = () => {
    lapListContainer.innerHTML = '';
    let numLap = lapCount++

    lapCounterSpan.innerHTML = `${numLap} laps`
    let lapTime = timerElement.innerHTML

    if (!lapArr.includes(lapTime)) {
        lapArr.push(lapTime)
    }

    return showLaps(lapArr)

}
const showLaps = (data) => {
    data.forEach((curItem) => {
        let lapItem = document.createElement('li')
        lapItem.classList.add('lap-item')

        let lapNumber = document.createElement('span')
        lapNumber.classList.add('lap-number')
        lapNumber.innerHTML = `Lap ${lapArr.indexOf(curItem) + 1}`

        let lapValue = document.createElement('span')
        lapValue.classList.add('lap-value')
        lapValue.innerHTML = `${curItem}`

        lapItem.append(lapNumber)
        lapItem.append(lapValue)
        lapListContainer.append(lapItem)
    })

    lapListContainer.lastChild.classList.add('lap-new-item')
    
}

startBtn.addEventListener(('click'), startTimer);
pauseBtn.addEventListener(('click'), pauseTimer)
resetBtn.addEventListener(('click'), resetTimer)
lapBtn.addEventListener(('click'), saveLap)
clearLapsBtn.addEventListener(('click'), clearLaps)