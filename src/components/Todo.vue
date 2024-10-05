<script setup>
import { useTodoStore } from '@/stores/todo'
import { onMounted } from 'vue'
import { getTodoStats } from '@/utils/todoUtils';

// Import store
const todoStore = useTodoStore()
const { stats } = getTodoStats()

// Svg Imports
import emptySvg from '@/assets/images/empty.svg'
import trashIcon from '@/assets/images/trash-icon.svg'
import editIcon from '@/assets/images/edit-icon.svg'


// Setup routing
onMounted(() => {
  // Watcher section start
  // untuk mendemokan boleh dicomment yang tidak ingin dijalankan
  todoStore.setupWatchers() // Basic Watcher
  todoStore.setupDeepWatcher() // Deep Watcher
  todoStore.setupEagerWatcher() // Eager Watcher
  todoStore.setupOnceWatcher() // Once Watcher
  // Watcher section end
  todoStore.fetchTodos() // Fetch todos dari API
  window.addEventListener('hashchange', () => todoStore.updateVisibility(window.location.hash.replace(/#\/?/, '')))
  todoStore.updateVisibility(window.location.hash.replace(/#\/?/, ''))
})
</script>

<template>
  <section class="max-w-xl mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">Todos (Pinia)</h1>
      <!-- pemakaian Pinia store diluar component (tepatnya dalam utils folder) -->
      <div>Total: {{ stats.total }}, Completed: {{ stats.completed }}, Remaining: {{ stats.remaining }}</div>
      <!-- Wrapper untuk input dan button menggunakan flexbox -->
      <div class="flex space-x-2">
        <input
          v-model="todoStore.newTodo"
          class="new-todo flex-1 p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
          autofocus
          placeholder="What needs to be done?"
          @keyup.enter="todoStore.addTodo"
        >
        <button
          class="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 text-white"
          @click="todoStore.addTodo"
        >
          Save
        </button>
      </div>
    </header>

    <!-- Section untuk daftar todo -->
    <section v-if="todoStore.todos.length > 0" class="main">
      <div class="flex items-center justify-between mb-4">
        <input
          id="toggle-all-pinia"
          class="toggle-all h-4 w-4 text-blue-600"
          type="checkbox"
          :checked="todoStore.remainingTodos === 0"
          @change="todoStore.toggleAllTodos"
        >
        <label for="toggle-all-pinia" class="text-gray-600 cursor-pointer hover:text-green-600">Mark all as complete</label>
      </div>

      <!-- Tambahkan kelas custom untuk scroll -->
      <ul class="todo-list space-y-2 max-h-60 overflow-y-scroll">
        <li
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          class="todo p-3 flex items-center justify-between rounded-lg border-1 bg-white"
        >
          <div v-if="todo === todoStore.editedTodo" class="flex items-center w-full space-x-2">
            <input
              class="edit flex-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
              type="text"
              v-model="todo.name"
              @keyup.enter="todoStore.saveEditedTodo(todo)"
            >
            <button
              class="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-600 text-white"
              @click="todoStore.saveEditedTodo(todo)"
            >
              Save
            </button>
            <button
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              @click="todoStore.cancelEditing(todo)"
            >
              Cancel
            </button>
          </div>

          <div v-else class="flex items-center justify-between w-full">
            <div class="view flex items-center flex-1">
              <input class="toggle h-4 w-4 text-blue-600" type="checkbox" @click="todoStore.doCompleted(todo)" v-model="todo.isCompleted">
              <label
                :class="{ 'line-through text-gray-500': todo.isCompleted, editing: todo === todoStore.editedTodo }"
                class="ml-3 text-lg" @dblclick="todoStore.markTodoAsEditing(todo)">{{ todo.name }}
              </label>
            </div>

            <div class="flex space-x-2">
              <button @click="todoStore.removeTodo(todo)">
                <img :src="trashIcon" alt="Delete icon" class="mx-auto w-6 h-6 object-cover">
              </button>
              <button @click="todoStore.markTodoAsEditing(todo)">
                <img :src="editIcon" alt="Edit icon" class="mx-auto w-6 h-6 object-cover">
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <section v-else class="text-center py-10">
      <img :src="emptySvg" alt="Todo image" class="mx-auto w-40 h-40 object-cover">
      <h2 class="text-gray-500 text-xl mt-3">Data is Empty</h2>
    </section>
        
    <footer class="mt-6" v-show="todoStore.todos.length">
      <div class="flex justify-between items-center mb-4">
        <span class="todo-count text-gray-700">
          <strong>{{ todoStore.remainingTodos }}</strong>
          <span>{{ todoStore.remainingTodos === 1 ? ' item' : ' items' }} left</span>
        </span>
        <ul class="filters flex space-x-3">
          <li>
            <a href="#/all"
              :class="{
                'text-orange-500 font-semibold': todoStore.visibility === 'all',
                'text-gray-600 hover:text-orange-500': todoStore.visibility !== 'all'
              }"
              class="text-gray-600 hover:text-orange-500"
            >
              All
            </a>
          </li>
          <li>
            <a href="#/active"
              :class="{
                'text-blue-500 font-semibold': todoStore.visibility === 'active',
                'text-gray-600 hover:text-blue-500': todoStore.visibility !== 'active'
              }"
              class="text-gray-600 hover:text-blue-500"
            >
              Active
            </a>
          </li>
          <li>
            <a href="#/completed"
              :class="{
                'text-green-500 font-semibold': todoStore.visibility === 'completed',
                'text-gray-600 hover:text-green-500': todoStore.visibility !== 'completed'
              }"
              class="text-gray-600 hover:text-green-500"
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
      <button 
        class="clear-completed px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" 
        @click="todoStore.clearCompletedTodos" 
        v-show="todoStore.todos.length > todoStore.remainingTodos"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>