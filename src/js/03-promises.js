import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

let delay = null;
let step = null;
let amount = null;

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(evt) {
  evt.preventDefault();
  delay = Number(evt.currentTarget.delay.value);
  step = Number(evt.currentTarget.step.value);
  amount = Number(evt.currentTarget.amount.value);
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
