class Stopwatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print();
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
  }

  resetTimer() {
    this.stop();
    this.reset();
    this.print();
  }

  addToList() {
    const itemList = document.createElement('li');
    itemList.innerText = this.format(this.times);
    resultList.appendChild(itemList);
  }

  clearList() {
    resultList.innerText = '';
  }
}

function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = '0' + result;
  }
  return result;
}
const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

const startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

const resultList = document.querySelector('.results');

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.resetTimer());

const addButton = document.getElementById('add');
addButton.addEventListener('click', () => stopwatch.addToList());

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => stopwatch.clearList());