const button = document.querySelector("#new-quote")
const quote = document.querySelector("#text")
const author = document.querySelector("#author")
const tweet = document.querySelector("#tweet-quote")
const link = document.querySelector("a")
const url = "https://api.quotable.io/random"

let quoteText = ""
let authorName = ""
let quoteSize

async function getQuoteAndAuthor(){
    const response = await fetch(url)
    const data =  await response.json()

    quoteText = data.content
    authorName = data.author
    quoteSize = data.length

    quote.textContent = quoteText
    author.textContent = authorName
}


function tweetQuote(e){
    let tweetText = `${quoteText} \n\n "${authorName}"`
    if(isNaN(quoteSize)){
        alert('No quote to tweet. Click the "New quote" button to get a quote first !!!') 
    }
    else if (quoteSize > 140) {
        e.preventDefault()
        alert('Ops, this quote is over 140 characters, too big to tweet !!!')
    }
    else{
        link.href = "https://twitter.com/intent/tweet?text=" + encodeURI(tweetText)
    }
}

button.addEventListener("click", getQuoteAndAuthor)
tweet.addEventListener("click", tweetQuote)