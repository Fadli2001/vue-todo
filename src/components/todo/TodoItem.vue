<template>
    <li class="todo p-3 flex items-center justify-between rounded-lg border-2">
      <div v-if="isEditing" class="flex items-center w-full space-x-2">
        <input
          class="edit flex-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
          type="text"
          v-model="editedName"
          @keyup.enter="save"
        >
        <Button @click="save" color="blue">Save</Button>
        <Button @click="cancel" color="red">Cancel</Button>
      </div>
  
      <div v-else class="flex items-center justify-between w-full">
        <div class="view flex items-center flex-1">
          <input class="toggle h-4 w-4 text-blue-600" type="checkbox" v-model="todo.isCompleted">
          <label
            :class="{ 'line-through text-gray-500': todo.isCompleted }"
            class="ml-3 text-lg"
            @dblclick="edit"
          >
            {{ todo.name }}
          </label>
        </div>
        <div class="flex space-x-2">
          <Button @click="remove">
            <img :src="trashIcon" alt="Delete icon" class="mx-auto w-6 h-6 object-cover">
          </Button>
          <Button @click="edit">
            <img :src="editIcon" alt="Edit icon" class="mx-auto w-6 h-6 object-cover">
          </Button>
        </div>
      </div>
    </li>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import trashIcon from '@/assets/images/trash-icon.svg';
  import editIcon from '@/assets/images/edit-icon.svg';
  import Button from '@/components/shared/Button.vue';
  
  const props = defineProps({
    todo: Object,
  });
  
  const emit = defineEmits(['removeTodo', 'saveTodo', 'cancelEdit', 'editTodo']);
  
  const isEditing = ref(false);
  const editedName = ref('');
  
  function edit() {
    isEditing.value = true;
    editedName.value = props.todo.name;
    emit('editTodo', props.todo);
  }
  
  function save() {
    emit('saveTodo', { ...props.todo, name: editedName.value });
    isEditing.value = false;
  }
  
  function cancel() {
    emit('cancelEdit', props.todo);
    isEditing.value = false;
  }
  
  function remove() {
    emit('removeTodo', props.todo);
  }
  </script>