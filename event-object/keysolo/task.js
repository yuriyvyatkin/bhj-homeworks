class Game {
  constructor() {
    this.statusWins = document.querySelector('.status__wins');
    this.statusLoss = document.querySelector('.status__loss');
    this.countdownTimer = document.querySelector('.countdown__timer');
    this.word = document.querySelector('.word');
    this.rules = this.word.innerHTML;
    this.stopped = false;
  }

  startGame() {
    this.render();
    this.startCountdownTimer();

    document.addEventListener('keyup', (event) => {
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
    })
  }

  render() {
    this.statusWins.textContent = 0;
    this.statusLoss.textContent = 0;
    this.countdownTimer.textContent = 0;
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

  startCountdownTimer() {
    this.countdownTimer.textContent = this.word.childElementCount;

    const id = setInterval(() => {
      if (this.stopped) {
        clearInterval(id);
        this.stopped = false;
      }

      if (--this.countdownTimer.textContent === 0) {
        clearInterval(id);
        this.fail(this.word.querySelector('.current__symbol'));
      }
    }, 1000);
  }

  success(currentSymbol) {
    currentSymbol.classList.remove('current__symbol');
    currentSymbol.classList.add('symbol_correct');
    
    if (currentSymbol.nextElementSibling === null) {
      if (++this.statusWins.textContent === 10) {
        alert('Вы победили :)')
        this.render();
      } else {
        this.setWord();
        this.startCountdownTimer();
      }
    } else {
      currentSymbol.nextElementSibling.classList.add('current__symbol');
    }
  }

  fail(currentSymbol) {
    currentSymbol.parentElement.classList.add('word_incorrect');

    if (++this.statusLoss.textContent === 3) {
      alert('Вы проиграли :(')
      currentSymbol.parentElement.classList.remove('word_incorrect');
      this.render();
    } else {
      setTimeout(() => {
        currentSymbol.parentElement.classList.remove('word_incorrect');
        this.setWord();
        this.startCountdownTimer();
      }, 1000);
    }
  }

  stopGame() {
    this.stopped = true;
    this.word.innerHTML = this.rules;
    this.statusWins.textContent = 0;
    this.statusLoss.textContent = 0;
    setTimeout(() => {
      this.countdownTimer.textContent = 0;
    }, 1000);
  }
}

const startButton = document.getElementById('start');
const exitButton = document.getElementById('exit');
let game = new Game();

startButton.onclick = () => {
  game.startGame();
  startButton.style.display = 'none';
  exitButton.style.display = 'block';
}

exitButton.onclick = () => {
  game.stopGame();
  startButton.style.display = 'block';
  exitButton.style.display = 'none';
}