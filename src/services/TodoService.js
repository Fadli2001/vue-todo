// src/services/TodoService.js
import { ref, computed } from 'vue'
import { getTodos, createTodo, deleteTodo, updateTodo } from '@/api/TodoApi'

export function useTodoService() {
  const newTodo = ref('')
  const todos = ref([])
  const visibility = ref('all')
  const editedTodo = ref(null)
  let beforeEditCache = ''

  const filters = {
    all: (todos) => todos,
    active: (todos) => todos.filter((todo) => !todo.isCompleted),
    completed: (todos) => todos.filter((todo) => todo.isCompleted),
  }

  const filteredTodos = computed(() => filters[visibility.value](todos.value))
  const remainingTodos = computed(() => filters.active(todos.value).length)

  async function fetchTodos() {
    try {
      todos.value = await getTodos()
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    }
  }

  async function addTodoItem() {
    const todoName = newTodo.value.trim()
    if (todoName) {
      try {
        await createTodo(todoName)
        await fetchTodos()
        newTodo.value = ''
      } catch (error) {
        console.error("Failed to add todo:", error)
      }
    }
  }

  async function removeTodoItem(todo) {
    try {
      const confirmed = confirm('Are you sure you want to delete this todo?')
        if (confirmed) {      
          await deleteTodo(todo.id)
          await fetchTodos()
        }
    } catch (error) {
      console.error("Failed to delete todo:", error)
    }
  }

  async function saveEditedTodoItem(todo) {
    try {
      await updateTodo({
        id: todo.id,
        name: todo.name,
        isCompleted: todo.isCompleted,
      })
      editedTodo.value = null
      await fetchTodos()
    } catch (error) {
      console.error("Failed to save edited todo:", error)
    }
  }

  function markTodoAsEditing(todo) {
    editedTodo.value = todo
    beforeEditCache = todo.name
  }

  function cancelEditing(todo) {
    editedTodo.value = null
    todo.name = beforeEditCache
  }

  function toggleAllTodos(event) {
    todos.value.forEach((todo) => (todo.isCompleted = event.target.checked))
  }

  async function clearCompletedTodos() {
    todos.value = todos.value.filter((todo) => !todo.isCompleted)
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
    fetchTodos,
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
