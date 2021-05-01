class Game {
  constructor() {
    this.wins = document.querySelector('.status__wins');
    this.losses = document.querySelector('.status__loss');
    this.timer = document.querySelector('.countdown__timer');
    this.word = document.querySelector('.word');
    this.rules = this.word.innerHTML;
  }

  startGame() {
    this.render();
    this.startTimer();

    this.handleKeyUp = (event) => {
      const currentSymbol = this.word.querySelector('.current__symbol');

      if (currentSymbol.parentElement.classList.contains('word_incorrect')) {
        return;
      }

      if (/^[a-zа-яё ]$/i.test(event.key)) {
        if (event.key.toLowerCase() === currentSymbol.textContent.toLowerCase()) {
          this.success(currentSymbol);
        } else {
          this.fail(currentSymbol);
        }
      }
    }

    document.addEventListener('keyup', this.handleKeyUp);
  }

  render() {
    this.wins.textContent = 0;
    this.losses.textContent = 0;
    this.timer.textContent = 0;
    this.setWord();
  }

  setWord() {
    const words = [
      'subway ешь свежее',
      'nike просто сделай это',
      'apple думай иначе',
      'adidas невозможное возможно',
      'honda сила мечты'
    ]

    const randomWord = words[Math.floor(Math.random() * words.length)].split('');

    let html = `<span class='symbol current__symbol'>${randomWord[0]}</span>`;

    randomWord.splice(1).forEach(letter => {
      html += `<span class='symbol'>${letter}</span>`
    })

    this.word.innerHTML = html;
  }

  startTimer() {
    this.timer.textContent = this.word.childElementCount;

    const timer = () => {
      if (--this.timer.textContent < 1) {
        clearInterval(this.timerId);
        this.fail(this.word.querySelector('.current__symbol'));
      }
    }

    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = setInterval(timer, 1000);
  }

  success(currentSymbol) {
    currentSymbol.classList.remove('current__symbol');
    currentSymbol.classList.add('symbol_correct');

    if (currentSymbol.nextElementSibling === null) {
      if (++this.wins.textContent > 9) {
        clearInterval(this.timerId);
        setTimeout(() => {
          alert('Вы победили :)');
        }, 100);
        setTimeout(() => {
          this.render();
          this.startTimer();
        }, 100);
      } else {
        this.setWord();
        this.startTimer();
      }
    } else {
      currentSymbol.nextElementSibling.classList.add('current__symbol');
    }
  }

  fail(currentSymbol) {
    currentSymbol.parentElement.classList.add('word_incorrect');

    if (++this.losses.textContent > 2) {
      clearInterval(this.timerId);
      setTimeout(() => {
        alert('Вы проиграли :(');
      }, 100);
      setTimeout(() => {
        currentSymbol.parentElement.classList.remove('word_incorrect');
        this.render();
        this.startTimer();
      }, 100);
    } else {
      clearInterval(this.timerId);
      setTimeout(() => {
        currentSymbol.parentElement.classList.remove('word_incorrect');
        this.setWord();
        this.startTimer();
      }, 1000);
    }
  }

  stopGame() {
    document.removeEventListener('keyup', this.handleKeyUp);
    clearInterval(this.timerId);
    this.wins.textContent = 0;
    this.losses.textContent = 0;
    this.timer.textContent = 0;
    this.word.innerHTML = this.rules;
  }
}

let game = new Game();

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

startButton.onclick = () => {
  game.startGame();
  startButton.style.display = 'none';
  stopButton.style.display = 'block';
}

stopButton.onclick = () => {
  game.stopGame();
  startButton.style.display = 'block';
  stopButton.style.display = 'none';
}