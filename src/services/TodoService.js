// services/TodoService.js

import { ref, computed } from 'vue'

// Filter definitions for Todo items
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.isCompleted),
  completed: (todos) => todos.filter((todo) => todo.isCompleted),
}

// State
const newTodo = ref('') // Variabel baru untuk menyimpan input
const todos = ref([])
const visibility = ref('all')
const editedTodo = ref(null)
let beforeEditCache = ''

// Computed states
const filteredTodos = computed(() => filters[visibility.value](todos.value))
const remainingTodos = computed(() => filters.active(todos.value).length)

// Initial setup for hash-based routing
window.addEventListener('hashchange', updateVisibility)
updateVisibility()

// Methods for managing Todo items
function addTodoItem() {
  const todoName = newTodo.value.trim()
  if (todoName) {
    todos.value.push({
      id: Date.now(),
      name: todoName,
      isCompleted: false,
    })
    newTodo.value = ''
  }
}

function removeTodoItem(todo) {  
  const confirmed = confirm('Are you sure you want to delete this todo?')
  if (confirmed) {
   removeTodo(todo)
  }
}

function removeTodo(todo){
    const index = todos.value.indexOf(todo)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
}

function toggleAllTodos(event) {
  todos.value.forEach((todo) => (todo.isCompleted = event.target.checked))
}

function markTodoAsEditing(todo) {
  editedTodo.value = todo
  beforeEditCache = todo.name
}

function saveEditedTodoItem(todo) {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.name = todo.name.trim()
    if (!todo.name) removeTodo(todo)
  }
}

function cancelEditing(todo) {
  editedTodo.value = null
  todo.name = beforeEditCache
}

function clearCompletedTodos() {
  todos.value = filters.active(todos.value)
}

// Routing function to manage visibility filter based on hash change
function updateVisibility() {
  const route = window.location.hash.replace(/#\/?/, '')
  if (filters[route]) {
    visibility.value = route
  } else {
    window.location.hash = ''
    visibility.value = 'all'
  }
}

export {
    newTodo,
    todos,
    visibility,
    editedTodo,
    filteredTodos,
    remainingTodos,
    addTodoItem,
    toggleAllTodos,
    markTodoAsEditing,
    saveEditedTodoItem,
    cancelEditing,
    clearCompletedTodos,
    removeTodoItem
}
