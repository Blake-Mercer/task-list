// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Functions
function addTodo(e) {
  // Prevent from from submitting
  e.preventDefault();
  // Todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create LI
  const newTodo = document.createElement('li');
  if (!todoInput.value) {
    return;
  }
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Add todo to localstorage
  saveLocalTodos(todoInput.value);
  // Completed button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // Delete button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
  // clear todo input value
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  // Delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeLocalTodo(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // Complete task action
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// Save todos to local storage
function saveLocalTodos(todo) {
  // check if todos already exist
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos from local storage
function getTodos() {
  // check if todos already exist
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    // Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
  });
}

// Remove todos from Local Storage
function removeLocalTodo(todo) {
  // check if todos already exist
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('input', filterTodo);
