const timer = document.querySelector("#timer")
const startButton = document.querySelector("#start")
const stopButton = document.querySelector("#stop")
const restartButton = document.querySelector("#restart")

const workTime = 25
const breakTime = 5

let timeLeft = workTime * 60
let breakTimeCheck = false

startButton.disabled = false
stopButton.disabled = true

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (timeLeft % 60).toString().padStart(2, "0")
  timer.innerHTML = `${minutes}:${seconds}`
}

function startTimer() {
  updateTimer()
  timerInterval = setInterval(() => {
    timeLeft--
    updateTimer()
    if (timeLeft === 0) {
      if (breakTimeCheck === false) breakTimeCheck = true
      else breakTimeCheck = false

      restartTimer()
    }
  }, 1000)

  startButton.disabled = true
  stopButton.disabled = false
  restartButton.disabled = true
}

function stopTimer() {
  clearInterval(timerInterval)

  startButton.disabled = false
  stopButton.disabled = true
  restartButton.disabled = false
}

function restartTimer() {
  if (breakTimeCheck === false) {
    timeLeft = workTime * 60
    restartButton.disabled = false
  } else {
    timeLeft = breakTime * 60
    restartButton.disabled = true
    playAlarm()
  }

  clearInterval(timerInterval)
  updateTimer()

  startButton.disabled = false
  stopButton.disabled = true
}

function playAlarm() {
  let alarm = new Audio("./assets/sounds/alarm.mp3")
  alarm.volume = 0.2
  alarm.loop = false
  alarm.play()
}

startButton.addEventListener("click", startTimer)
stopButton.addEventListener("click", stopTimer)
restartButton.addEventListener("click", restartTimer)

updateTimer()
