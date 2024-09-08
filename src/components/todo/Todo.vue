<template>
  <section class="max-w-xl mx-auto mt-10 p-4 bg-gray-100 shadow-lg rounded-lg">
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">Todos</h1>
      <div class="flex space-x-2">
        <input
          v-model="newTodo"
          class="new-todo flex-1 p-3 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
          autofocus
          placeholder="What needs to be done?"
          @keyup.enter="addTodoItem"
        />
        <Button @click="addTodoItem" color="blue">Save</Button>
      </div>
    </header>

    <TodoList
      v-if="todos.length > 0"
      :filteredTodos="filteredTodos"
      @removeTodo="removeTodoItem"  
      @saveEditedTodoItem="saveEditedTodoItem"
      @cancelEditing="cancelEditing"
      @markTodoAsEditing="markTodoAsEditing"
    />

    <section v-else class="text-center py-10">
      <img :src="emptySvg" alt="Todo image" class="mx-auto w-40 h-40 object-cover" />
      <h2 class="text-gray-500 text-xl mt-3">Data is Empty</h2>
    </section>

    <footer class="mt-6" v-show="todos.length">
      <div class="flex justify-between items-center">
        <span class="todo-count text-gray-700">
          <strong>{{ remainingTodos }}</strong>
          <span>{{ remainingTodos === 1 ? ' item' : ' items' }} left</span>
        </span>
        <TodoFilters :visibility="visibility" />
        <Button @click="clearCompletedTodos" color="red" v-show="todos.length > remainingTodos">
          Clear completed
        </Button>
      </div>
    </footer>
  </section>
</template>

<script setup>
import emptySvg from '@/assets/images/empty.svg';
import TodoList from '@/components/todo/TodoList.vue';
import TodoFilters from '@/components/todo/TodoFilters.vue';
import Button from '@/components/shared/Button.vue';

import {
  newTodo,
  todos,
  visibility,
  filteredTodos,
  addTodoItem,
  removeTodoItem, // Pastikan fungsi ini tersedia
  saveEditedTodoItem,
  cancelEditing,
  markTodoAsEditing,
  clearCompletedTodos,
  remainingTodos  
} from '@/services/TodoService';
</script>
