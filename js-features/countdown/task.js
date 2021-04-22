let timerCounter = document.getElementById('timer');

function downloadFile(filePath) {
  const link = document.createElement('a');
  link.href = filePath;
  link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  link.click();
}

const reduceCounter = function () {
  const time = timerCounter.textContent
    .split(':')
    .map((item) => parseInt(item));

  let [hours, minutes, seconds] = time;

  if (seconds === 0) {
    if (minutes === 0) {
      if (hours === 0) {
        alert('Вы победили в конкурсе!');
        downloadFile('./task.js');
        location.assign('./file.unknown');
        clearInterval(id);
      } else {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      }
    } else {
      minutes -= 1;
      seconds = 59;
    }
  } else {
    seconds -= 1;
  }

  timerCounter.textContent = [hours, minutes, seconds]
    .map((item) => String(item).padStart(2, '0'))
    .join(':');
};

const id = setInterval(reduceCounter, 1000);
