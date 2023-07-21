import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  submitForm: document.querySelector('.form'),
};

let delay = null;
let step = null;
let amont = null;

refs.firstDelayInput.addEventListener('input', onFirstDelay);
refs.delayStepInput.addEventListener('input', onDelayStep);
refs.amountInput.addEventListener('input', onAmount);
refs.submitForm.addEventListener('submit', onSubmitForm);

function onAmount() {
  amont = refs.amountInput.value;
}

function onDelayStep() {
  step = Number(refs.delayStepInput.value);
}

function onFirstDelay() {
  delay = Number(refs.firstDelayInput.value);
}

function onSubmitForm(event) {
  event.preventDefault();
  for (let i = 1; i <= amont; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + step;
  }
  delay = Number(refs.firstDelayInput.value);
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
