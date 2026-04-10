const timerElement = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const clearLapsBtn = document.getElementById('clearLapsBtn');
const lapListContainer = document.getElementById('lapList');
const lapCounterSpan = document.getElementById('lapCounter');

let secondsEl = 0
let minutesEl = 0
let hoursEl = 0
let time = `${hoursEl} : ${minutesEl} : ${secondsEl}`
let timerCount = 0;
let intervalTimer;
let lapCount = 1;
let lapArr = []

const addZero = (num) => {
    return String(num).padStart(2, "0")
}


const startTimer = () => {
    intervalTimer = setInterval(() => {

        upsecondsEl = secondsEl++

        if (upsecondsEl > 58) {
            secondsEl = 0
            upminutesEl = minutesEl++
            if (upminutesEl > 58) {
                minutesEl = 0
                hoursEl++
            }

        }

        console.log(time)

        time = `${addZero(hoursEl)} : ${addZero(minutesEl)} : ${addZero(secondsEl)}`
        timerDisplay.innerHTML = `${time}`
    }, 1000)
}

const pauseTimer = () => {
    clearInterval(intervalTimer)
}

const resetTimer = () => {
    secondsEl = 0
    minutesEl = 0
    hoursEl = 0
    time = `${addZero(hoursEl)} : ${addZero(minutesEl)} : ${addZero(secondsEl)}`
    timerElement.innerText = `${time}`
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