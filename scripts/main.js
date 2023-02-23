const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
let deck;
let winner = '';
let busted = '';
const playerArray = [];
const dealerArray = [];
let playerPointTally = document.getElementById("player-points");
let dealerPointTally = document.getElementById("dealer-points");
let playerText = document.getElementById("result");
const buildDeck = () => {
  let values = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  let types = ["clubs", "diamonds", "hearts", "spades"];
  deck = [];
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "_of_" + types[i]);
    }
  }
};
buildDeck();
const shuffleDeck = () => {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
};
shuffleDeck();
const randomCards = (finalCard) => {
  //places random card in dealer hand
  const cardImg = document.createElement("img");
  const card = deck.pop();
  cardImg.src = "./images/" + card + ".png";
  finalCard.appendChild(cardImg);
  const value = getValue(card);
  playerArray.push(value);
  const playerPoints = playerArray.reduce((acc, curr) => acc + curr, 0);
  playerPointTally.textContent = playerPoints;
  console.log(playerPoints);
  // console.log(playerArray);
};
const randomCards2 = (finalCard) => {
  //places random card in dealer hand
  const cardImg = document.createElement("img");
  const card = deck.pop();
  cardImg.src = "./images/" + card + ".png";
  finalCard.appendChild(cardImg);
  const value = getValue(card);
  dealerArray.push(value);
  const dealerPoints = dealerArray.reduce((acc, curr) => acc + curr, 0);
  dealerPointTally.textContent = dealerPoints;
  console.log(dealerPoints);
  //  console.log(dealerArray);
};
const dealCards = () => {
  randomCards(playerHand);
  randomCards(playerHand);
};
const dealCards2 = () => {
  randomCards2(dealerHand);
  randomCards2(dealerHand);
};
dealButton.addEventListener("click", () => {
  dealCards();
  dealCards2();
  dealButton.setAttribute("disabled", true);
});
hitButton.addEventListener("click", () => {
  randomCards(playerHand);
  if (playerPointTally <= 21) {
    hitButton.setAttribute("disabled", true);
  }
  randomCards(dealerHand);
  overTwentyOne();
});
standButton.addEventListener("click", () => {
  dealerBust();
});
function getValue(cardString) {
  let data = cardString.split("_of_");
  let value = data[0];
  if (isNaN(value)) {
    if (value == "ace") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}
const overTwentyOne = () => {
  if (playerPointTally.textContent < 21) {
    randomCards(playerHand);
  } else if (playerPointTally.textContent == 21) {
    hitButton.setAttribute("disabled", true);
    alert("you win!")
  } else {
    hitButton.setAttribute("disabled", true);
    alert("you lose!")
  }
};
const dealerBust = () => {
  if (dealerPointTally.textContent < 17) {
    randomCards2(dealerHand);
  }
};
const winOrLose = () => {
  if (
    dealerPointTally.textContent > playerPointTally.textContent &&
    dealerPointTally.textContent <= 21
  ) {
    let winner = " Winner!";
    let loser = " Loser!";
    dealerText.innerHTML = winner;
    playerText.textContent = loser;
  }
  else if(playerPointTally.textContent < dealerPointTally.textContent && dealerPointTally.textContent <= 21) {
    dealerPointTally.textContent = loser;
    playerPointTally.textContent = winner;
  }
  playButton.addEventListener('click', () => {
    window.location.reload()
  })
};
