import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input[type="text"]'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.start.setAttribute('disabled', 'true');
let ms = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(`The promotion is valid until: ${selectedDates[0]}`);
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future!');
    } else {
      refs.start.removeAttribute('disabled');
      refs.start.addEventListener('click', onCountDown);
    }
  },
};

const flatP = flatpickr(refs.input, options);

function onCountDown() {
  const cuontDownId = setInterval(() => {
    const currentTime = Date.now();
    const targetTime = flatP.selectedDates[0];
    ms = targetTime - currentTime;
    let timeLeft = convertMs(ms);
    const { days, hours, minutes, seconds } = timeLeft;
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    if (ms < '1000') {
      clearInterval(cuontDownId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
