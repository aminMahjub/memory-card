const gameCards = document.querySelectorAll('.card-game-container button');
const gameCardsContainer = document.querySelector('.card-game-container');
const cardValuse = ['c-sharp', 'react', 'dart', 'flutter', 'c', 'node-js'];

gameCardsContainer.classList.add('show-cards-container');

let uniqueNumbers = [];
function generateUniqueRandom(maxNr) {
  let random = Number(Math.floor(Math.random() * maxNr));
  
  if(!uniqueNumbers.includes(random)) {
    uniqueNumbers.push(random);
    return random;
  } else {
    return uniqueNumbers.length < maxNr ? generateUniqueRandom(maxNr) : 'No more number avaialbe';
  }
}

let j = 0;
for (let card of gameCards) {
  const random = generateUniqueRandom(gameCards.length);
  const cardValueImage = document.createElement('img');

  gameCards[random].setAttribute('aria-code', j);
  gameCards[random].setAttribute('aria-langauge', cardValuse[j]);
  cardValueImage.src = `./image/${cardValuse[j]}-icon.png`;
  gameCards[random].append(cardValueImage);
  
  j === 5 ? j = 0 : j++;
  
  card.addEventListener('click', (event) => {
    event.preventDefault();
    checkCardEquality(event);
  })
}

let choosenCards = [];
function checkCardEquality(event) {
  const targetCard = event.target;
  targetCard.parentElement.classList.add(`show-img`);
  targetCard.disabled = true;
  choosenCards.push(targetCard.parentElement);

  if (choosenCards.length === 2) {
    let firstCard = choosenCards[0];
    let secondCard = choosenCards[1];

    setTimeout(() => {
      if (+firstCard.getAttribute('aria-code') !== +secondCard.getAttribute('aria-code')) {
        firstCard.classList.remove('show-img');
        firstCard.disabled = false;
        secondCard.classList.remove('show-img');
        secondCard.disabled = false;   
      } else {
        const t = Array.from(gameCards).every(gameCard => gameCard.classList[1] === 'show-img');
        if (t) {
          import('./timer.js').then(timer => {
            clearInterval(timer.default);
          });
        }
        console.log(t);
      }
    }, 500);

    choosenCards = [];
  }  
}

let counter = 0;
function showCardGame(sameCards) {
  
  for (let card of gameCards) {
    if (+card.getAttribute('aria-code') === counter) {
      sameCards.push(card);
    }
  }
  
  sameCards[0].classList.add('show-img');
  sameCards[1].classList.add('show-img');
  
  counter++;
}

const showCardInterval = window.setInterval(() => {
  let sameCards = [];

  showCardGame(sameCards);

  setTimeout(() => {
    sameCards[0].classList.remove('show-img');
    sameCards[1].classList.remove('show-img');

    if (counter === 6) {
      gameCardsContainer.classList.remove('show-cards-container');
      clearInterval(showCardInterval);
      import('./timer.js').then(timer => timer.default);
    }
  }, 700);
}, 2000);
