const intro = document.querySelector("#phrase")

const firstSentence = "I'am a self taught web developer".split("")
const secondSentence = "I have created this page to show some of my work".split("")
const thirdSentence = "Please, scroll down".split("")
//Keep displaying the phrases
async function displayPhrase(sentence, delay = 100){
    await(waitForDelay(1000))
    let i = 0;

    while(i < sentence.length){
        await waitForDelay(delay)
        intro.textContent += sentence[i]
        i++

        if(intro.textContent === firstSentence.join("")){
            await waitForDelay(2000)
            intro.textContent = ""
            displayPhrase(secondSentence)
        }
        if(intro.textContent === secondSentence.join("")){
            await waitForDelay(2000)
            intro.textContent = ""
            displayPhrase(thirdSentence)
        }
        if(intro.textContent === thirdSentence.join("")){
            await waitForDelay(2000)
            intro.textContent = ""
            displayPhrase(firstSentence)
        }
    }
    return
}
function waitForDelay(time){
    return new Promise(resolve => setTimeout(resolve, time))
}

window.addEventListener("load", () => {
    displayPhrase(firstSentence)
})
//All above this coment handles only the first section phrase type effect

const boxes = document.querySelectorAll(".box")

//Those two below handle the link clicking effect 
boxes.forEach(box => box.addEventListener("click", function addEffect(){
    this.classList.add("active")
}))
boxes.forEach(box => box.addEventListener("transitionend", function removeEffect(e){
    if(e.propertyName !== "transform") return
    this.classList.remove("active")
}))

//handles the  slide in/out effect
const box1 = document.querySelector(".box1")
const box2 = document.querySelector(".box2")
const firstSection = document.querySelector("#welcome")
const secondSection = document.querySelector("#about")
const thirdSection = document.querySelector("#skills")
window.addEventListener("scroll", slideEffect)

//Get the device height and apply the effect always when the scroll reach half of the second section height
function slideEffect(){
   const firstPosition = Math.floor(scrollY + firstSection.offsetHeight)
   const secondPosition = scrollY 
   const activationHeight = firstSection.offsetHeight + (secondSection.offsetHeight / 2)
   
   if(firstPosition > activationHeight && secondPosition < activationHeight){
       box1.classList.add("slide_from_left")
       box2.classList.add("slide_from_right")
   }
   else{
       box1.classList.remove("slide_from_left")
       box2.classList.remove("slide_from_right")
   }
}

//Makes navigtion bar appear on the top of the screen when the scroll reaches the end of the first section
const navBar = document.querySelector("#navigation_bar")
window.addEventListener("scroll", handleNavBar)

function handleNavBar(){
    const height = firstSection.offsetHeight
    const navPosition = scrollY

    return navPosition >= height ? navBar.style.opacity = 1 : navBar.style.opacity = 0
}


