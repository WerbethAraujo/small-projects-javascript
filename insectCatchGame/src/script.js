const screens = document.querySelectorAll('.screen');
const insectBtns = document.querySelectorAll('.choose-insect-btn');
const startBtn = document.querySelector('.start-btn');
const gameContainer = document.querySelector('.game-container');
const timeEl = document.querySelector('.time');
const scoreEl = document.querySelector('.score');
const message = document.querySelector('.message');

let selectedInsect = {};
let seconds = 0;
let score = 0;

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

insectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');

    selectedInsect = { src, alt };

    screens[1].classList.add('up');

    setTimeout(createInsect, 1000);

    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let minute = Math.floor(seconds / 60);
  let second = seconds % 60;

  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  timeEl.innerHTML = `Time: ${minute}:${second}`;
  seconds++;
}

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');

  const { x, y } = getRamdomLocation();

  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;

  insect.innerHTML = `<img
    src="${selectedInsect['src']}"
    alt="${selectedInsect['alt']}"
    style="transform: rotate(${Math.random() * 360}deg)"
  />`;

  insect.addEventListener('click', catchInsect);

  gameContainer.appendChild(insect);
}

function getRamdomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;

  return { x, y };
}

function catchInsect() {
  increaseScore();

  this.classList.add('caught');

  setTimeout(() => this.remove(), 2000);

  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;

  if (score > 19) {
    message.classList.add('visible');
  }

  scoreEl.innerHTML = `Score: ${score}`;
}
