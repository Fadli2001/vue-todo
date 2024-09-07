<script setup>
import { ref, computed } from 'vue'

// Svg Imports
import emptySvg from '@/assets/images/empty.svg'
import plusIcon from '@/assets/images/plus-icon.svg'
import trashIcon from '@/assets/images/trash-icon.svg'
import editIcon from '@/assets/images/edit-icon.svg'

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
  
  <!-- Wrapper untuk input dan button menggunakan flexbox -->
  <div class="flex space-x-2">
    <input
      v-model="newTodo" 
      class="new-todo flex-1 p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
      autofocus
      placeholder="What needs to be done?"
      @keyup.enter="addTodoItem"
    >
    <button
      class="px-4 py-2 bg-violet-300 rounded-md hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300"
      @click="addTodoItem"
    >
      <img :src="plusIcon" alt="Todo image" class="mx-auto w-8 h-8 object-cover">
    </button>
  </div>
</header>

    
<section v-if="todos.length > 0" class="main">
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
    :class="{ 'line-through text-gray-500': todo.isCompleted, editing: todo === editedTodo }"
  >
    <input
      v-if="todo === editedTodo"
      class="edit w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
      type="text"
      v-model="todo.name"
      @blur="saveEditedTodoItem(todo)"
      @keyup.enter="saveEditedTodoItem(todo)"
      @keyup.escape="cancelEditing(todo)"
    >
    
    <div class="view flex items-center flex-1">
      <input class="toggle h-4 w-4 text-blue-600" type="checkbox" v-model="todo.isCompleted">
      <label class="ml-3 text-lg" @dblclick="markTodoAsEditing(todo)">{{ todo.name }}</label>
    </div>

    <!-- Icon Buttons on the right side -->
    <div class="flex space-x-2">
      <button @click="removeTodoItem(todo)">
        <img :src="trashIcon" alt="Delete icon" class="mx-auto w-5 h-5 object-cover">
      </button>
      <button @click="markTodoAsEditing(todo)">
        <img :src="editIcon" alt="Edit icon" class="mx-auto w-5 h-5 object-cover">
      </button>
    </div>
  </li>
</ul>

</section>

<!-- Section jika tidak ada todo -->
<section v-else class="text-center py-10">
  <img :src="emptySvg" alt="Todo image" class="mx-auto w-40 h-40 object-cover">
  <h2 class="text-gray-500 text-xl mt-3">Data is Empty</h2>
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
