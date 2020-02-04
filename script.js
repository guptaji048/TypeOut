const apiUrl = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quote");
const quoteInputElement = document.getElementById("inputText");
const timerElement = document.getElementById("timerId");
let complete = false;
/* User Input Event1*/
quoteInputElement.addEventListener("input", () => {
  const quoteArray = quoteDisplayElement.querySelectorAll("span");
  const inputArray = quoteInputElement.value.split("");
  let correct = "true";
  quoteArray.forEach((characterSpan, index) => {
    const chara = inputArray[index];
    if (chara == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (chara === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  /*Calling New Quote*/
  if (correct) {
    complete = true;
    getNextQuote();
  }
});

/* Getting Quote from API*/
async function getNextQuote() {
  const resp = await fetch(apiUrl);
  const data = await resp.json();
  const quotes = data.content;
  quoteDisplayElement.innerText = quotes;

  /*Splitting Quote into indivisual span*/
  quoteDisplayElement.innerHTML = "";
  quotes.split("").forEach(character => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  /*Calling Timer*/
  timeLimit();
}

/* Setting Timer acc. to quote length */
function timeLimit() {
  var array = document.querySelectorAll("span");
  var time = 0;
  if (array.length <= 90) {
    time = 30;
  } else if (array.length > 90 && array.length <= 135) {
    time = 45;
  } else {
    time = 60;
  }

  let x = setInterval(() => {
    if (time < 0 || complete) {
      clearInterval(x);
      complete = false;
      getNextQuote();
    } else {
      timerElement.innerHTML = time;
      time--;
    }
  }, 1000);
}

/* For Getting inital quote */
getNextQuote();
