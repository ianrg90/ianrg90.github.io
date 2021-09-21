const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal =  document.querySelector("#equals")
const clear = document.querySelector("#clear")
const del = document.querySelector("#delete")
const displayPrevNum = document.querySelector("#previous-number")
const displayCurNum = document.querySelector("#current-number") 

let curNum = "";
let prevNum = "";
let mathSign = undefined;

function concatNumbers(number){
    if(curNum.includes(".") && number === (".")) return
    curNum = curNum.toString() + number.toString()
}

function selectMathSign(sign){
    if(curNum === "") return
    if(prevNum !== ""){
        calculate()
    }
    mathSign = sign
    prevNum = curNum 
    curNum = ""
}

function calculate(){
    let result
    const prevToNum = parseFloat(prevNum)
    const curToNum = parseFloat(curNum)

    if(isNaN(prevToNum) || isNaN(curToNum)) return
    switch(mathSign){
        case "+":
            result = prevToNum + curToNum
            break
        case "-":
            result = prevToNum - curToNum
            break
        case "*":
            result = prevToNum * curToNum
            break
        case"/":
            result = prevToNum / curToNum
            break
    }
    
    curNum = result
    mathSign = undefined
    prevNum = ""
}

function fixDisplayNumbers(number){
    const int = parseFloat(number.toString().split(".")[0])
    const dec = number.toString().split(".")[1]
    let display 
    if(isNaN(int)){
        display = ""
    }else{
        display = int.toLocaleString("en")
    }
    if(dec != undefined){
        display = display + "." + dec
    }
    return display
}

function handleDisplay(){
    displayCurNum.textContent = fixDisplayNumbers(curNum)
    if(mathSign != undefined){
        displayPrevNum.textContent = fixDisplayNumbers(prevNum) + " " + mathSign
    }else{
        displayPrevNum.textContent = fixDisplayNumbers(prevNum)
    }
}

function deleteLast(){
    curNum = curNum.replace(/.$/, "")
} 

function clearAll(){
    curNum = "0"
    prevNum = ""
    mathSign = ""
}

numbers.forEach(number => number.addEventListener("click", () => {
    concatNumbers(number.textContent)
    handleDisplay()
}))

operators.forEach(operator => operator.addEventListener("click", () =>{
    selectMathSign(operator.textContent)
    handleDisplay()
}))

equal.addEventListener("click", () =>{
    calculate()
    handleDisplay()
})

del.addEventListener("click", () => {
    deleteLast()
    handleDisplay()
})

clear.addEventListener("click", () => {
    clearAll()
    handleDisplay()
})