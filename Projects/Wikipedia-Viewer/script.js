const searchField = document.querySelector("#textarea")
const results = document.querySelector(".results")
let topics;

async function getInfo(searchWord){

    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchWord}&gsrlimit=10&prop=pageimages|extracts&exchars=100&exintro&explaintext&exlimit=max&format=json&origin=*`
    const response = await fetch(url)
    const data = await response.json()

    const content = await data.query.pages
    const keys = Object.keys(content)

    //Creates one div element for each key, populates it with href link, title and content
    results.innerHTML = keys.map(key => {
        return `<div class = "list" id = "${content[key].title}">
                    <a class = "link" href = "https://en.wikipedia.org/wiki/${content[key]["title"].replace(" ", "_")}" target = "_blank">
                        <span class = "title">${content[key].title}</span>
                        <hr>
                        <span class = "content">${content[key].extract}</span>
                    </a>                    
                </div>`
    }).join("")
}


//If searchField has any letters the function start to search the wiki for matches
searchField.addEventListener("keyup", function getSearchWord() {
    searchWord = this.value
    if(searchWord.length >= 1){
       getInfo(searchWord)    
    }else{
//When the field is empty remove list 
        while(results.firstChild){
            results.removeChild(results.firstChild)
            searchField.placeHolder = "Type your search here"
        }
    }
})

//When the user moves to the topics the effect is applied in the topic the cursor is over
searchField.addEventListener("mouseleave", () => {
    topics = document.querySelectorAll(".list")
    topics.forEach(topic => topic.addEventListener("mouseover", (e) =>{
        topic.classList.add("active")
    }))
    topics.forEach(topic => topic.addEventListener("mouseleave", (e) =>{
    topic.classList.remove("active")
    }))
})










