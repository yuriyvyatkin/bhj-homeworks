const taskInput = document.getElementById('task__input');
const tasksAdd = document.getElementById('tasks__add');
const tasksList = document.getElementById('tasks__list');

tasksList.innerHTML = localStorage.getItem('todos');

taskInput.focus();

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

  localStorage.setItem('todos', tasksList.innerHTML);

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
      localStorage.setItem('todos', tasksList.innerHTML);
    } else {
      localStorage.removeItem('todos');
    }
  }
})
