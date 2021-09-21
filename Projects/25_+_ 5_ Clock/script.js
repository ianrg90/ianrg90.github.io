const timerDisplay = document.querySelector("#time-to-go")
const currentClock = document.querySelector("#name")
const changeBreak = document.querySelectorAll(".break-buttons")
const changeSession = document.querySelectorAll(".session-buttons")
const start = document.querySelector("#start")
const pause = document.querySelector("#pause")
const reset = document.querySelector("#reset")
const sessionLength = document.querySelector("#session-length")
const breakLenght = document.querySelector("#break-length")
const alarm = document.querySelector("#alarm")

let isTimeRunning = false
let isPaused = true
let sessionDuration = 1500 //Makes sure the clock can start with the default values even if the user has not passed any new values 
let breakDuration = 300 // Same as above
let clock

function setSessionTime(e) {
    if(isTimeRunning) return
    if(sessionLength.textContent === "1" && e.value === "-") return
    if(e.value === "+"){
        sessionLength.textContent++
    }else{
        sessionLength.textContent--
    }
    sessionDuration = parseFloat(sessionLength.textContent * 60)
    handleDisplay(sessionDuration)
}
//Having a hard time to join these two in one function
function setBreakTime (e){
    if(isTimeRunning) return
    if(breakLenght.textContent === "1" && e.value === "-") return
    if(e.value === "+"){
        breakLenght.textContent++
    }else{
        breakLenght.textContent--
    }
    breakDuration = parseFloat(breakLenght.textContent * 60)
}
//Get the time set by the user and format the display
function handleDisplay(seconds){
    const minutes = Math.floor(seconds / 60)
    const remainingSecs = seconds % 60
    const display = `${minutes >= 10 ? minutes : "0" + minutes}:${remainingSecs >= 10 ? remainingSecs : "0" + remainingSecs}`
    timerDisplay.textContent = display

    if(seconds === 0) {
        alarm.playbackRate = 1.5
        alarm.play()
    }
    return seconds < 60 ? timerDisplay.style.color = "red" : timerDisplay.style.color = "white" 
}

//Handle the clock countdown
function timer(sessionDuration, breakDuration){
    if(isTimeRunning) return //can't start clock if is already running 
    clearInterval(clock)
    isTimeRunning = true
    const now = Date.now()
    const sessionTime = now + sessionDuration * 1000
    const breakTime = sessionTime + breakDuration * 1000
    let timeFixer = 0

    clock = setInterval(() => {
        
        const sessionTimeLeft = Math.round((sessionTime - Date.now()) / 1000) + timeFixer 
        const breakTimeLeft = Math.round((breakTime - Date.now()) / 1000) + timeFixer 

        if(!isPaused){
            if(sessionTimeLeft >= 0){
                currentClock.textContent = "Session"
                handleDisplay(sessionTimeLeft)
            }else{
                currentClock.textContent = "Break"
                handleDisplay(breakTimeLeft)  
            }
            if(breakTimeLeft <= 0){
                isTimeRunning = false
                timer(sessionDuration, breakDuration)
            }
        }else{
            timeFixer++ //Compensate for the time the clock remained paused
        }
    }, 1000)   
}

//Remove transition 
function controlActive(e){
    if(e.propertyName !== "transform") return
    e.target.classList.remove("active")
}

document.addEventListener("transitionend", controlActive)

changeSession.forEach(button => button.addEventListener("click", () => {
    setSessionTime(button)
    //If the buttons won't work the effect will not be applied
    if(isTimeRunning) return
    button.firstChild.classList.add("active")

}))

changeBreak.forEach(button => button.addEventListener("click", () => {
    setBreakTime(button)
    if(isTimeRunning) return
    button.firstChild.classList.add("active")  
}))

start.addEventListener("click", () => {
    timer(sessionDuration, breakDuration)
    isTimeRunning = true
    isPaused = false
    start.classList.add("active")
})
    
pause.addEventListener("click", () =>{
    isPaused = true
    pause.classList.add("active")
})

//Reset clock and set all interface to default values
reset.addEventListener("click", () =>{
    reset.classList.add("active")
    clearInterval(clock)
    currentClock.textContent = "Session"
    sessionDuration = 1500
    breakDuration = 300
    sessionLength.textContent = sessionDuration / 60
    breakLenght.textContent = breakDuration / 60
    handleDisplay(sessionDuration)
    isTimeRunning = false
    isPaused = true
})











