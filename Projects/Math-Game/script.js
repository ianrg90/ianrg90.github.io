const options = document.querySelectorAll(".options")
const play = document.querySelector(".play")
const restart = document.querySelector(".restart")
const time = document.querySelector("#time")
const question = document.querySelector("#question")
const middle = document.querySelector("#middle_section")
const answers = document.querySelector("#answers")
const score = document.querySelector("#score")
const right = document.querySelector("#right")
const wrong = document.querySelector("#wrong")

let correctResult;

//Create random math expressions and correct and false answers
function handleGame(){
    if(!isPlaying) return
    score.textContent = `Score: ${totalScore}`
    const mathSign = ["+", "-", "x"]
    const operator = mathSign[parseInt(Math.random() * 3)]
    const firstNumber = (parseInt(Math.random() * 10) + 1)  
    const secondNumber = (parseInt(Math.random() * 10) + 1)
    const expression = firstNumber.toString() + " " +  operator + " " +  secondNumber.toString()

    question.textContent = expression

    if(operator === "+"){
        correctResult = firstNumber + secondNumber
        falseResult1 = firstNumber + secondNumber + 2
        falseResult2 = firstNumber + secondNumber + 1
        falseResult3 = firstNumber + secondNumber - 2
    }
    if(operator === "-"){
        correctResult = firstNumber - secondNumber
        falseResult1 = firstNumber - secondNumber + 2
        falseResult2 = firstNumber - secondNumber + 1
        falseResult3 = firstNumber - secondNumber - 2
    }
    if(operator === "x"){
        correctResult = firstNumber * secondNumber
        falseResult1 = firstNumber * (secondNumber + 1)
        falseResult2 = firstNumber * (secondNumber - 1)
        falseResult3 = (firstNumber * secondNumber) + 3
    }

    const randomOption = parseInt(Math.random() * 4)
    const randomOption2 = parseInt(Math.random() * 3)
    const randomOption3 = parseInt(Math.random() * 2)
    const optionsArray = [...answers.children]
    
    optionsArray[randomOption].firstChild.textContent = correctResult
    optionsArray.splice(randomOption, 1)

    optionsArray[randomOption2].firstChild.textContent = falseResult1
    optionsArray.splice(randomOption2, 1)

    optionsArray[randomOption3].firstChild.textContent = falseResult2
    optionsArray.splice(randomOption3, 1)

    optionsArray[0].firstChild.textContent = falseResult3
    
}

let totalScore = 0

function handleAnswers(choice){
    if(!isPlaying) return
    if(choice == correctResult){
        wrong.style.opacity = 0
        right.style.opacity = 1
        totalScore++
        handleGame()
    }else{
        wrong.style.opacity = 1
    }
}

let remainingTime;
let clock;

function timmer(){
    if(!isPlaying) return  
    score.style.opacity = 1
    const startGameTime = Date.now() + (60 * 1000) 
    time.textContent = "Time: 60"
    time.style.opacity = 1
    middle.textContent = "Choose the correct answer"
    clock = setInterval(() => {
        const now = Date.now()
        remainingTime = Math.ceil((startGameTime - now) / 1000)
        if(remainingTime < 0){
            //This block handles display changes when timmer reaches zero
            time.style.opacity = 0
            right.style.opacity = 0
            wrong.style.opacity = 0
            middle.textContent = ""
            score.style.opacity = 0
            answers.style.zIndex = -2
            question.textContent = `Game Over ! Your total score is: ${totalScore}`
            question.style.backgroundColor = "orange"
            clearInterval(clock)
            isPlaying = false
        }else{
            time.textContent = `Time: ${remainingTime}`
        }
    }, 1000)
    
    return remainingTime
}


function handleButtonChange(){
    if(isPlaying) {
        play.style.zIndex = -1
        restart.style.zIndex = 0
    }else{
        play.style.zIndex = 0
        restart.style.zIndex = -1
    }
}

function resetGame(){
    isPlaying = false
    totalScore = 0
    score.style.opacity = 0
    time.style.opacity = 0
    answers.style.zIndex = "initial"
    clearInterval(clock)
    question.style.backgroundColor = "initial"
    question.textContent = "Math Game" 
    middle.textContent = ""
    answers.children[0].firstChild.textContent = "A"
    answers.children[1].firstChild.textContent = "B"
    answers.children[2].firstChild.textContent = "C"
    answers.children[3].firstChild.textContent = "D"
}

//Down this point handles only effects application and removal
function handleClickEffect(){
   this.classList.add("active")
}

function removeClickEffect(e){
    if(e.propertyName !== "transform") return
    this.classList.remove("active")
}

options.forEach(option => option.addEventListener("click", handleClickEffect))
options.forEach(option => option.addEventListener("transitionend", removeClickEffect))
//Up this point handles only effects application and removal 

let isPlaying = false
play.addEventListener("click", () => {
    isPlaying = true
    timmer()
    handleButtonChange()
    handleGame()
})

restart.addEventListener("click", () => {
    resetGame()
    handleButtonChange()
})

options.forEach(option => option.addEventListener("click" , (e) => {
    handleAnswers(e.target.firstChild.textContent)
}))

window.addEventListener("mousemove", () => {
    if(!isPlaying) return
    right.style.opacity = 0
    wrong.style.opacity = 0
})


