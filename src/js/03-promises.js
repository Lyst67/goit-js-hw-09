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
  step = refs.delayStepInput.value;
}

function onFirstDelay() {
  delay = refs.firstDelayInput.value;
}

function onSubmitForm(event) {
  event.preventDefault();
  createPromise(1, delay);
}

function createPromise(position, delay) {
  setTimeout(() => {
    const stepId = setInterval(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
      position += 1;
      delay = Number(delay) + Number(step);
      if (position > amont) {
        clearInterval(stepId);
      }
    }, step);
  }, delay);
}
