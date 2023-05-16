// Import stylesheets
import './style.css';

const div = document.createElement('div');
div.classList.add('container');
document.body.appendChild(div);

for (let i = 0; i < 20; i++) {
  const cell = div.appendChild(document.createElement('div'));
  cell.style.gridArea = `cell-${i}`;
}

function dec2bcd(number) {
  return (Math.floor(number / 10) << 4) | number % 10;
}

function concatBits(acc, bcd) {
  return (acc << 7) | bcd;
}

function updateClock() {
  const currentDate = new Date();

  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  const bitMap = [hour, minute, second].map(dec2bcd).reduce(concatBits);

  const itemsArray = [].slice.call(div.children);

  for (let i = 0; i < div.children.length; i++) {
    (bitMap >> i) & 1
      ? itemsArray[i].classList.add('colored')
      : itemsArray[i].classList.remove('colored');
  }
}

setInterval(updateClock, 1000);

updateClock();
