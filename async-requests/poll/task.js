const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const url = 'https://netology-slow-rest.herokuapp.com/poll.php';

let xhr = new XMLHttpRequest();

xhr.open('GET', url);

xhr.responseType = 'json';

xhr.send();

xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    const poll = Object.values(xhr.response.data);
    const id = xhr.response.id;

    pollTitle.textContent = poll[0];

    let html = '';

    poll[1].forEach(answer => {
      html += `
      <button class="poll__answer">
        ${answer}
      </button>
      `
    })

    pollAnswers.innerHTML = html;

    pollAnswers.querySelectorAll('.poll__answer').forEach(answer => {
      answer.onclick = (event) => {

        const index = poll[1].findIndex(answer => answer === event.currentTarget.innerText)

        const params = `vote=${id}&answer=${index}`;

        xhr = new XMLHttpRequest();

        xhr.open('POST', url);

        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.responseType = 'json';

        xhr.send(params);

        xhr.onload = function () {
          if (xhr.status !== 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
          } else {
            const votes = Object.values(xhr.response.stat);

            const reducer = (total, vote) => total += vote.votes;

            const totalVotes = votes.reduce(reducer, 0)

            html = '';

            votes.forEach(vote => {
              html += `
              <div class="poll__answer">
                <span class="poll__answer-content">
                  ${vote.answer}
                </span>
                <span class="poll__answer-rating">
                  <b>
                    ${(vote.votes / totalVotes * 100).toFixed(2)}%
                  </b>
                </span>
              </div>
              `
            });

            pollAnswers.innerHTML = html;
          }
        }

        alert('Спасибо, ваш голос засчитан!');
      }
    });


  }
}

