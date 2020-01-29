const RANDOM_QUOTE_API_URL = 'https://quotes.stormconsultancy.co.uk/random.json'
const quoteDisplayElement = document.getElementById('quote')
const quoteInputElement = document.getElementById('inputText')
const timerElement = document.getElementById('timerId')

/* User Input Event1*/
quoteInputElement.addEventListener('input', () => {
    const quoteArray = quoteDisplayElement.querySelectorAll('span');
    const inputArray = quoteInputElement.value.split('');
    let correct = 'true'
    quoteArray.forEach((characterSpan,index) => {
        const chara = inputArray[index]
        if(chara == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        } else if(chara === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    /*Calling New Quote*/
    if (correct) getNextQuote()
})

/* Getting Quote from API*/
async function getNextQuote() {
    const resp = await fetch(RANDOM_QUOTE_API_URL)
    const data = await resp.json()
    const quotes = data.quote
    data.map(contents => {
        quoteDisplayElement.innerText = quotes
    })

    /*Splitting Quote into indivisual span*/
    quoteDisplayElement.innerHTML = ''    
    quotes.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null
    /*Calling Timer*/
    timeLimit()
}

/* Setting Timer acc. to quote length */
function timeLimit() {
    var array = document.querySelectorAll('span')
    var base = 0
    if(array.length <= 90) {
        var time = 30
    } else if(array.length > 90 && array.length <= 135) {
        var time = 45
    } else {
        var time = 60
    }
    timerElement.innerHTML = time
    var x = setInterval(() => {
        base++
        timerElement.innerHTML = time - base
        
        if(base === time) {
            clearInterval(x)    
        }
    },1000)
    
}

/* For Getting inital quote */ 
getNextQuote()
