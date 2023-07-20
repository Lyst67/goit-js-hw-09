function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};

refs.start.addEventListener('click', onSwitchColor);
refs.stop.addEventListener('click', onStopSwitchColor);
let changeColorId = null;

function newColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function onSwitchColor() {
  changeColorId = setInterval(newColor, 1000);
  this.setAttribute('disabled', 'true');
}

function onStopSwitchColor() {
  clearInterval(changeColorId);
  refs.start.removeAttribute('disabled');
}
