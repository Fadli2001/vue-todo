<template>
    <section>
      <ul class="todo-list space-y-2">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @removeTodo="$emit('removeTodo', $event)"
          @saveTodo="$emit('saveTodo', $event)"
          @cancelEdit="$emit('cancelEdit', $event)"
          @editTodo="$emit('editTodo', $event)"
        />
      </ul>
    </section>
  </template>
  
  <script setup>
  import TodoItem from '@/components/todo/TodoItem.vue';
  
  defineProps({
    filteredTodos: Array,
  });
  
  defineEmits(['removeTodo', 'saveTodo', 'cancelEdit', 'editTodo']);
  </script>