const toasts = document.querySelector('.container-toasts');
const btn = document.querySelector('.btn');

const messages = ['Default', 'Create Sucssesfuly', 'Error at create'];
const colors = ['Grenn', 'Red', 'white'];

btn.addEventListener('click', () => createNotification());

function createNotification() {
  const toast = document.createElement('div');
  toast.classList.add('toast');

  if (getColors() === 'Red') {
    toast.innerText = 'Error at create';
    toast.style.backgroundColor = 'red';
  } else if (getColors() === 'Grenn') {
    toast.innerText = 'Create Sucssesfuly';
    toast.style.backgroundColor = 'green';
  } else {
    toast.innerText = 'Default';
  }
  toasts.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const getColors = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
