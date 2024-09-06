<script setup>
import { ref, computed } from 'vue'

// Filter definitions for Todo items
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
}

// State
const todos = ref([])
const visibility = ref('all')
const editedTodo = ref(null)

// Computed states
const filteredTodos = computed(() => filters[visibility.value](todos.value))
const remainingTodos = computed(() => filters.active(todos.value).length)

// Initial setup for hash-based routing
window.addEventListener('hashchange', updateVisibility)
updateVisibility()

// Methods for managing Todo items
function addTodoItem(event) {
  const newTodoTitle = event.target.value.trim()
  if (newTodoTitle) {
    todos.value.push({
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
    })
    event.target.value = '' // Clear input after adding
  }
}

function removeTodoItem(todo) {
  const index = todos.value.indexOf(todo)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

function toggleAllTodos(event) {
  todos.value.forEach((todo) => (todo.completed = event.target.checked))
}

function markTodoAsEditing(todo) {
  editedTodo.value = todo
  beforeEditCache = todo.title
}

function saveEditedTodoItem(todo) {
  if (editedTodo.value) {
    editedTodo.value = null
    todo.title = todo.title.trim()
    if (!todo.title) removeTodoItem(todo)
  }
}

function cancelEditing(todo) {
  editedTodo.value = null
  todo.title = beforeEditCache
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
</script>

<template>
  <section class="todoapp max-w-xl mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
    
    <!-- Header Section: Add Todo -->
    <header class="header mb-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">Todos</h1>
      <input
        class="new-todo w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodoItem"
      >
    </header>
    
    <!-- Main Section: Todo List -->
    <section class="main" v-show="todos.length">
      <div class="flex items-center justify-between mb-4">
        <input
          id="toggle-all"
          class="toggle-all h-5 w-5 text-blue-600"
          type="checkbox"
          :checked="remainingTodos === 0"
          @change="toggleAllTodos"
        >
        <label for="toggle-all" class="text-gray-600">Mark all as complete</label>
      </div>

      <ul class="todo-list space-y-2">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo p-3 bg-gray-50 flex items-center justify-between rounded-lg shadow-sm"
          :class="{ 'line-through text-gray-500': todo.completed, editing: todo === editedTodo }"
        >
          <div class="view flex items-center">
            <input class="toggle h-4 w-4 text-blue-600" type="checkbox" v-model="todo.completed">
            <label class="ml-3 text-lg" @dblclick="markTodoAsEditing(todo)">{{ todo.title }}</label>
          </div>
          <button class="destroy text-red-500 hover:text-red-700" @click="removeTodoItem(todo)">x</button>
          <input
            v-if="todo === editedTodo"
            class="edit w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
            type="text"
            v-model="todo.title"
            @blur="saveEditedTodoItem(todo)"
            @keyup.enter="saveEditedTodoItem(todo)"
            @keyup.escape="cancelEditing(todo)"
          >
        </li>
      </ul>
    </section>
    
    <!-- Footer Section: Filters & Clear Completed -->
    <footer class="footer mt-6" v-show="todos.length">
      <div class="flex justify-between items-center mb-4">
        <span class="todo-count text-gray-700">
          <strong>{{ remainingTodos }}</strong>
          <span>{{ remainingTodos === 1 ? ' item' : ' items' }} left</span>
        </span>
        <ul class="filters flex space-x-3">
          <li>
            <a href="#/all" :class="{ 'text-blue-600 font-semibold': visibility === 'all' }" class="text-gray-600 hover:text-blue-600">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ 'text-blue-600 font-semibold': visibility === 'active' }" class="text-gray-600 hover:text-blue-600">Active</a>
          </li>
          <li>
            <a href="#/completed" :class="{ 'text-blue-600 font-semibold': visibility === 'completed' }" class="text-gray-600 hover:text-blue-600">Completed</a>
          </li>
        </ul>
      </div>
      <button 
        class="clear-completed px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" 
        @click="clearCompletedTodos" 
        v-show="todos.length > remainingTodos"
      >
        Clear completed
      </button>
    </footer>
    
  </section>
</template>
