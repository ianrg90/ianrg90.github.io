const keys = document.querySelectorAll(".keys")
const powerButton = document.querySelectorAll("input[type = radio]")
const output = document.querySelector(".pannel")
const volumeLevel = document.querySelector("input[type = range]")

let power = "On"
let volume = volumeLevel.value

function playSound(keyPressed) {
    const audio = document.querySelector(`audio[data-key = "${keyPressed}"]`)
    const key = document.querySelector(`.keys[data-key = "${keyPressed}"]`)
    audio.volume = volume

    if (audio && power === "On") {
        audio.play()
        audio.currentTime = 0
        output.textContent = key.id.toUpperCase()
        key.classList.add("active")
    } else {
        return
    }
}

function removeEffect(keyPressed) {
    if (keyPressed.propertyName !== "transform") 
        return
    
    this.classList.remove("active")
}

window.addEventListener("keydown", (e) => {
    playSound(e.keyCode)
})

keys.forEach(key => key.addEventListener("click", (e) => {
    playSound(e.target.dataset.key)
}))

keys.forEach(key => key.addEventListener("transitionend", removeEffect))


powerButton.forEach(button => button.addEventListener("click", () => {
    power = button.value
    output.textContent = `Power: ${power}`
}))

volumeLevel.addEventListener("click", () => {
    volume = volumeLevel.value
    output.textContent = `Volume: ${
        Math.round(volume * 100)
    }`
})
