// src/services/todoService.js
import { ref, computed } from 'vue'

export function useTodoService() {
  // State
  const newTodo = ref('')
  const todos = ref([])
  const visibility = ref('all')
  const editedTodo = ref(null)
  let beforeEditCache = ''

  // Filter definitions
  const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.isCompleted),
    completed: (todos) => todos.filter((todo) => todo.isCompleted),
  }

  // Computed properties
  const filteredTodos = computed(() => filters[visibility.value](todos.value))
  const remainingTodos = computed(() => filters.active(todos.value).length)

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
      const index = todos.value.indexOf(todo)
      if (index > -1) {
        todos.value.splice(index, 1)
      }
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
      if (!todo.name) removeTodoItem(todo)
    }
  }

  function cancelEditing(todo) {
    editedTodo.value = null
    todo.name = beforeEditCache
  }

  function clearCompletedTodos() {
    todos.value = filters.active(todos.value)
  }

  function updateVisibility(route) {
    if (filters[route]) {
      visibility.value = route
    } else {
      visibility.value = 'all'
    }
  }

  return {
    newTodo,
    todos,
    visibility,
    editedTodo,
    filteredTodos,
    remainingTodos,
    addTodoItem,
    removeTodoItem,
    toggleAllTodos,
    markTodoAsEditing,
    saveEditedTodoItem,
    cancelEditing,
    clearCompletedTodos,
    updateVisibility,
  }
}
