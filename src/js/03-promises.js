import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let delay = null;
let step = null;
let amount = null;

form.addEventListener('submit', onSubmitForm);
form.elements.delay.addEventListener('input', onFirstDelay);
form.elements.step.addEventListener('input', onDelayStep);
form.elements.amount.addEventListener('input', onAmount);

function onAmount(evt) {
  amount = evt.target.value;
}

function onDelayStep(evt) {
  step = Number(evt.target.value);
}

function onFirstDelay(evt) {
  delay = Number(evt.target.value);
}

function onSubmitForm(evt) {
  evt.preventDefault();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + step;
  }
  delay = Number(form.elements.delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        console.log({ position, delay });
      } else {
        reject({ position, delay });
        console.log({ position, delay });
      }
    }, delay);
  });
}
