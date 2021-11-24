const colors = document.querySelectorAll("[data-number]");
const round = document.querySelector(".output");
const [start, restartButton] = [
  document.querySelector(".start"),
  document.querySelector(".reset"),
];

let roundColors = [];
let clickedColors = [];
let roundNumber = 1;
let counter = 0;
let isRoundDone = false;
let isGameRunning = false;

function gameRound() {
  isGameRunning = true;
  counter++;
  round.textContent = roundNumber;
  if (counter > roundNumber) {
    isRoundDone = true;
    return;
  } else {
    const randomColor = Math.floor(Math.random() * 4);
    roundColors.push(randomColor);
    colors[randomColor].classList.add("selected");
    const timer = setTimeout(() => {
      colors[randomColor].classList.remove("selected");
    }, 500);

    setTimeout(gameRound, 1000);
  }
}

function getCickedColor() {
  if (!isRoundDone) {
    alert("Wait the end of the round to start clicking colors")
    return;
  }
  if (clickedColors.length < roundColors.length) {
    clickedColors.push(+this.dataset.number);
  }
  if (
    clickedColors.length === roundColors.length &&
    checkAnswer(roundColors, clickedColors)
  ) {
    roundColors.splice(0, roundColors.length);
    clickedColors.splice(0, clickedColors.length);
    counter = 0;
    roundNumber++;
    alert("You did it! ready for next round ?");
    isRoundDone = false;
    setTimeout(gameRound, 500);
  }
  if (
    clickedColors.length === roundColors.length &&
    !checkAnswer(roundColors, clickedColors)
  ) {
    alert(`You lost in round ${roundNumber}`);
    restart();
  }
}

//Helper function to check if arrays are equal
function checkAnswer(arr1, arr2) {
  const check = arr1.map((item, i) => {
    return item === arr2[i];
  });
  return check.every((item) => item === true);
}

function restart() {
  counter = 0;
  roundNumber = 1;
  roundColors.splice(0, roundColors.length);
  clickedColors.splice(0, clickedColors.length);
  round.textContent = 0;
  isRoundDone = false;
  isGameRunning = false;
}

function startGame() {
  if (isGameRunning) {
    return;
  }
  gameRound();
}

start.addEventListener("click", startGame);
restartButton.addEventListener("click", restart);
colors.forEach((color) => color.addEventListener("click", getCickedColor));



