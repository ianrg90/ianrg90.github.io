const button = document.querySelector("button")
const information = document.querySelector(".information")

async function getPlanetData(){
    
    button.textContent = "Loading ..."
    const randomID = Math.floor(Math.random() * (60 -1 + 1) + 1) 
    const target = "https://swapi.dev/api/planets/" + randomID + "/?format=json"

    const response = await fetch(target)
    const data = await response.json()

    const keys = Object.keys(data)
    information.innerHTML = keys.map(key => {
        return `<li>${key.replace("_", " ")}: ${data[key]}</li>`
    }).join("")
    
    button.textContent = "Click here to see planet info!"
}

button.addEventListener("click", getPlanetData);