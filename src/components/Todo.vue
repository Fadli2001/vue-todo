<template>
  <section class="max-w-xl mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
    <!-- Header Section: Add Todo -->
    <header class="mb-6">
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
          class="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800 text-white"
          @click="addTodoItem"
        >     
          Save
        </button>
      </div>
    </header>

    
    <section v-if="todos.length > 0" class="main">
      <div class="flex items-center justify-between mb-4">
        <input
          id="toggle-all"
          class="toggle-all h-4 w-4 text-blue-600"
          type="checkbox"
          :checked="remainingTodos === 0"
          @change="toggleAllTodos"
        >
        <label for="toggle-all" class="text-gray-600 cursor-pointer hover:text-green-600">Mark all as complete</label>
      </div>

      <ul class="todo-list space-y-2">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo p-3 flex items-center justify-between rounded-lg border-2"          
        >
          <!-- Mode Edit -->
          <div v-if="todo === editedTodo" class="flex items-center w-full space-x-2">
            <input
              class="edit flex-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
              type="text"
              v-model="todo.name"
              @keyup.enter="saveEditedTodoItem(todo)"
            >
            <button
              class="px-3 py-1 bg-blue-500 rounded-md hover:bg-blue-600 text-white"
              @click="saveEditedTodoItem(todo)"
            >
              Save
            </button>
            <button
              class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              @click="cancelEditing(todo)"
            >
              Cancel
            </button>
          </div>

          <div v-else class="flex items-center justify-between w-full">
            <!-- Mode Tampilan Normal -->
            <div class="view flex items-center flex-1">
              <input class="toggle h-4 w-4 text-blue-600" type="checkbox" v-model="todo.isCompleted">
              <label 
              :class="{ 'line-through text-gray-500': todo.isCompleted, editing: todo === editedTodo }"
              class="ml-3 text-lg" @dblclick="markTodoAsEditing(todo)">{{ todo.name }}</label>
            </div>

            <!-- Tombol Hapus dan Edit (disembunyikan saat mode edit) -->
            <div class="flex space-x-2">
              <button @click="removeTodoItem(todo)">
                <img :src="trashIcon" alt="Delete icon" class="mx-auto w-6 h-6 object-cover">
              </button>
              <button @click="markTodoAsEditing(todo)">
                <img :src="editIcon" alt="Edit icon" class="mx-auto w-6 h-6  object-cover">
              </button>
            </div>
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
    <footer class="mt-6" v-show="todos.length">
      <div class="flex justify-between items-center mb-4">
        <span class="todo-count text-gray-700">
          <strong>{{ remainingTodos }}</strong>
          <span>{{ remainingTodos === 1 ? ' item' : ' items' }} left</span>
        </span>
        <ul class="filters flex space-x-3">
          <li>
            <a href="#/all"
              :class="{
                'text-orange-500 font-semibold': visibility === 'all',  // Orange for All
                'text-gray-600 hover:text-orange-500': visibility !== 'all'
              }"
              class="text-gray-600 hover:text-orange-500"
            >
              All
            </a>
          </li>
          <li>
            <a href="#/active"
              :class="{
                'text-blue-500 font-semibold': visibility === 'active', // Blue for Active
                'text-gray-600 hover:text-blue-500': visibility !== 'active'
              }"
              class="text-gray-600 hover:text-blue-500"
            >
              Active
            </a>
          </li>
          <li>
            <a href="#/completed"
              :class="{
                'text-green-500 font-semibold': visibility === 'completed', // Green for Completed
                'text-gray-600 hover:text-green-500': visibility !== 'completed'
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
        @click="clearCompletedTodos" 
        v-show="todos.length > remainingTodos"
      >
        Clear completed
      </button>
    </footer>
    
  </section>
</template>

<script setup>
// Svg Imports
import emptySvg from '@/assets/images/empty.svg'
import trashIcon from '@/assets/images/trash-icon.svg'
import editIcon from '@/assets/images/edit-icon.svg'

// Named imports from todoService
import { 
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
} from '@/services/TodoService'
</script>
