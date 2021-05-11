const taskInput = document.getElementById('task__input');
const tasksAdd = document.getElementById('tasks__add');
const tasksList = document.getElementById('tasks__list');

let todos = localStorage.getItem('todos');

if (todos) {
  let html = '';

  todos = todos.split('\n');
  todos.pop();
  todos.forEach(todo => {
    html += `
      <div class="task">
        <div class="task__title">
          ${todo}
        </div>
        <a href="#" class="task__remove">&times;</a>
      </div>
    `
  });

  tasksList.innerHTML = html;
}

taskInput.focus();

function getTodos() {
  return tasksList.innerText.replace(/\n×\n/g, '\n');
}

function handleInput() {
  if (taskInput.value === '') {
    return;
  }

  tasksList.insertAdjacentHTML(
    'beforeend',
    `
    <div class="task">
      <div class="task__title">
        ${taskInput.value}
      </div>
      <a href="#" class="task__remove">&times;</a>
    </div>
  `
  );

  localStorage.setItem('todos', getTodos());

  taskInput.value = '';
  taskInput.focus();
}

taskInput.onkeyup = (event) => {
  if (event.key === 'Enter') {
    handleInput();
  }
}

tasksAdd.onclick = (event) => {
  event.preventDefault();

  handleInput();
}

tasksList.addEventListener('click', (event) => {
  const {target} = event;

  if (target.classList.contains('task__remove')) {
    target.closest('.task').remove();

    if (tasksList.children.length) {
      localStorage.setItem('todos', getTodos());
    } else {
      localStorage.removeItem('todos');
    }
  }
})
