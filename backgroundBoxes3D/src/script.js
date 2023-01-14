const boxContainer = document.querySelector('.boxes-container');
const btnEl = document.querySelector('.magic-btn');

btnEl.addEventListener('click', () => {
  boxContainer.classList.toggle('big');
});

const createBoxImage = () => {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      const boxEl = document.createElement('div');
      boxEl.classList.add('box');
      boxEl.style.backgroundPosition = `${-j * 125}px ${-i * 125}px`;
      boxContainer.appendChild(boxEl);
    }
  }
};
createBoxImage();
