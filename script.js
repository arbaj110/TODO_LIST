// Initialize todoList from localStorage or empty array if nothing is stored
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Display items on page load
displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');
  let todoItem = inputElement.value;
  let todoDate = dateElement.value;
  
  // Only add if the input is not empty
  if (todoItem.trim() !== '') {
    todoList.push({item: todoItem, dueDate: todoDate});
    
    // Save to localStorage
    saveTodoListToLocalStorage();
    
    // Clear input fields
    inputElement.value = '';
    dateElement.value = '';
    
    // Update the display
    displayItems();
  }
}

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  
  for (let i = 0; i < todoList.length; i++) {
    let {item, dueDate} = todoList[i];
    newHtml += `
      <span>${item}</span>
      <span>${dueDate}</span>
      <button class='btn-delete' onclick="deleteTodo(${i})">Delete</button>
    `;
  }
  
  containerElement.innerHTML = newHtml;
}

// New function to delete a todo item
function deleteTodo(index) {
  todoList.splice(index, 1);
  
  // Save to localStorage after deletion
  saveTodoListToLocalStorage();
  
  // Update the display
  displayItems();
}

// New function to save todoList to localStorage
function saveTodoListToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}