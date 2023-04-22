const timers = document.querySelectorAll('.time-counter time');
let second = 0;
let milliSecond = 0;

export default window.setInterval(() => {
  const secondInpt = timers[0];
  const milliSecondInpt = timers[1];

  milliSecondInpt.textContent = milliSecond++;
  
  if (milliSecond > 59) {
    secondInpt.textContent = ++second;
    milliSecond = 0
  }

}, 1);
  