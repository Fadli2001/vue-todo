<script setup>

import trashIcon from '@/assets/images/trash-icon.svg'
import editIcon from '@/assets/images/edit-icon.svg'

import { useTodoService } from '@/services/TodoService';

defineProps({
    todo:{
        type : Object,
        required : true
    }
})

const {
    editedTodo,
    filteredTodos,
    saveEditedTodoItem,
    cancelEditing,
    markTodoAsEditing,
    removeTodoItem
} = useTodoService()

</script>

<template>
        <li          
          class="todo p-3 flex items-center justify-between rounded-lg border-1  bg-white"
        >
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
            <div class="view flex items-center flex-1">
              <input class="toggle h-4 w-4 text-blue-600" type="checkbox" v-model="todo.isCompleted">
              <label
                :class="{ 'line-through text-gray-500': todo.isCompleted, editing: todo === editedTodo }"
                class="ml-3 text-lg" @dblclick="markTodoAsEditing(todo)">{{ todo.name }}
              </label>
            </div>

            <div class="flex space-x-2">
              <button @click="removeTodoItem(todo)">
                <img :src="trashIcon" alt="Delete icon" class="mx-auto w-6 h-6 object-cover">
              </button>
              <button @click="markTodoAsEditing(todo)">
                <img :src="editIcon" alt="Edit icon" class="mx-auto w-6 h-6 object-cover">
              </button>
            </div>
          </div>
        </li>
</template>