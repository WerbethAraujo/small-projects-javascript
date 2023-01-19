const resultEl = document.querySelector('.result');
const generateBtn = document.querySelector('.btn-large');
const lengthEl = document.querySelector('.length');
const upperEl = document.querySelector('.uppercase');
const lowerEl = document.querySelector('.lowercase');
const numberEl = document.querySelector('.number');
const symbolEl = document.querySelector('.symbol');
const clipboardEl = document.querySelector('.fa-clipboard');

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');

  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  alert('Senha copiada para a área de transferência');
});

generateBtn.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  resultEl.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(upper, lower, number, symbol, length) {
  let geratedPassword = '';

  const typesCount = upper + lower + number + symbol;

  const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];

      geratedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = geratedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$&*()=<>^}]{[';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
