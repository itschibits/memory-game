"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

let cards = [];
let flippedCards = [];
let cardClick = function(event){
  handleCardClick(event.target)
}
let clickNum = 0;

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    // missing code here ...
    let card = document.createElement("div");
    card.setAttribute("class", color);
    cards.push(card);
    gameBoard.appendChild(card);
    card.addEventListener("click", cardClick)
  }
}


/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  let color = card.className;
  card.setAttribute("style", "background-color: " + card.className)
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.setAttribute("style", "background-color: none");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  if(flippedCards.length < 2){
    flipCard(evt);
    evt.removeEventListener("click", cardClick)
    flippedCards.push(evt);
  }
  clickNum++
  if(flippedCards.length === 2 && clickNum === 2){
    if(flippedCards[0].style.backgroundColor === flippedCards[1].style.backgroundColor){
      flippedCards = [];
      clickNum = 0;
    } else {
      setTimeout(function(){
        for(let i = 0; i < flippedCards.length; i++){
          unFlipCard(flippedCards[i]);
        }
        flippedCards[0].addEventListener("click", cardClick)
        flippedCards[1].addEventListener("click", cardClick)
        flippedCards = [];
        clickNum = 0;
      }, 2000);
    }
  }
}