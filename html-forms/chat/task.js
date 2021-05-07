const chatWidget = document.querySelector('.chat-widget');
const chatLabel = chatWidget.querySelector('.chat-widget__side');
const messagesContainer = chatWidget.querySelector('.chat-widget__messages-container');
const messages = chatWidget.querySelector('.chat-widget__messages');
const input = chatWidget.querySelector('.chat-widget__input');
const botMessages = [
  'Вы не купили ни одного товара для того, чтобы так с нами разговаривать!',
  'К сожалению, все операторы сейчас заняты. Не пишите нам больше.',
  'Кто тут?',
  'Где ваша совесть?',
  'Мы ничего не будем вам продавать!',
  'Добрый день! До свидания!'
];

function sendQuestion() {
  messages.insertAdjacentHTML('beforeend', `
    <div class="message">
      <div class="message__time">${getTime()}</div>
      <div class="message__text">Могу я вам чем-то помочь?</div>
    </div>
  `);
}

function getTime() {
  const date = new Date();
  return String(date.getHours()).padStart(2, '0') + 
         ':' + 
         String(date.getMinutes()).padStart(2, '0');
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function handleEnter(event) {
  if (event.key === 'Enter') {
    if (input.value === '') {
      return;
    }

    clearTimeout(timerId);

    const time = getTime();

    messages.insertAdjacentHTML('beforeend', `
      <div class="message message_client">
        <div class="message__time">${time}</div>
        <div class="message__text">${input.value}</div>
      </div>
      <div class="message">
        <div class="message__time">${time}</div>
        <div class="message__text">${getRandom(botMessages)}</div>
      </div>
    `);

    input.value = '';

    messagesContainer.scrollTo(0, messagesContainer.scrollHeight);

    timerId = setTimeout(sendQuestion, 30000);
  }
}

let timerId = setTimeout(sendQuestion, 30000);

chatLabel.onclick = () => {
  chatWidget.classList.add('chat-widget_active');
}

input.addEventListener('keyup', handleEnter);

document.onclick = (event) => {
  if (!event.target.closest('.chat-widget')) {
    input.value = '';
    clearTimeout(timerId);
    chatWidget.classList.remove('chat-widget_active');
  }
}
