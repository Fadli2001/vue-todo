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
    all: (todos) => Array.isArray(todos) ? todos : [],
    active: (todos) => Array.isArray(todos) ? todos.filter((todo) => !todo.isCompleted) : [],
    completed: (todos) => Array.isArray(todos) ? todos.filter((todo) => todo.isCompleted) : [],
  }

  const filteredTodos = computed(() => filters[visibility.value](todos.value))
  const remainingTodos = computed(() => filters.active(todos.value).length)

  const fetchTodos = async () => {
    try {
      todos.value = await getTodos()            
    } catch (error) {
      console.error("Failed to fetch todos:", error)
    }
  }

  const addTodoItem = async () => {
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

  const removeTodoItem = async (todo) => {
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

  const saveEditedTodoItem = async (todo) => {
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

  const doCompleted = async (todo) => {
    try {
      await updateTodo({
        id: todo.id,
        name: todo.name,
        isCompleted: true,
      })
      alert("Todo is Updated")
      await fetchTodos()
    }catch(error){
      console.error("Failed to compelete todo:", error)
    }
  }

  const markTodoAsEditing = (todo) => {
    editedTodo.value = todo
    beforeEditCache = todo.name
  }

  const cancelEditing = (todo) => {
    editedTodo.value = null
    todo.name = beforeEditCache
  }

  const toggleAllTodos = (event) => {
    todos.value.forEach((todo) => (todo.isCompleted = event.target.checked))
  }

  const clearCompletedTodos = async () => {
    todos.value = todos.value.filter((todo) => !todo.isCompleted)
  }

  const updateVisibility = (route) => {
    visibility.value = filters[route] ? route : 'all'
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
    doCompleted
  }
}
