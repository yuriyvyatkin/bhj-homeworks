const clickerCounter = document.getElementById('clicker__counter');
const clickerSpeedometer = document.getElementById('clicker__speedometer');
const cookie = document.getElementById('cookie');

let lastClickTime = Date.now();

const clicksSpeed = [];

cookie.onclick = function () {
  const newClickTime = Date.now();

  clicksSpeed.push((newClickTime - lastClickTime) / 1000);

  lastClickTime = Date.now();

  clickerSpeedometer.textContent = (clicksSpeed.reduce((acc, clickSpeed) => acc += clickSpeed) / clicksSpeed.length).toFixed(2);

  if (cookie.width === 200) {
    cookie.width -= 25;
  } else {
    cookie.width += 25;
  }

  ++clickerCounter.textContent;
}
