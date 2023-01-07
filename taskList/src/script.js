const form = document.querySelector('#form');
const tasksList = document.querySelector('.tasks-list');
const inputEl = document.querySelector('.input');

const tasks = JSON.parse(localStorage.getItem('tasks'));

if (tasks) {
  tasks.forEach((task) => addTask(task));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  addTask();
});

function addTask(task) {
  let taskText = inputEl.value;

  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const taskEl = document.createElement('li');

    if (task && task.complited) {
      taskEl.classList.add('complited');
    }

    taskEl.innerText = taskText;

    taskEl.addEventListener('click', () => {
      taskEl.classList.toggle('complited');

      updateLocalStorage();
    });

    taskEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      taskEl.remove();

      updateLocalStorage();
    });

    tasksList.appendChild(taskEl);

    inputEl.value = '';

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const tasksEl = document.querySelectorAll('li');

  const tasks = [];

  tasksEl.forEach((taskEl) => {
    tasks.push({
      text: taskEl.innerText,
      complited: taskEl.classList.contains('complited'),
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
