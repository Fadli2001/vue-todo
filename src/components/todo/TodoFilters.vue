<template>
    <ul class="filters flex space-x-3">
      <li>
        <a href="#/all" :class="filterClass('all')">All</a>
      </li>
      <li>
        <a href="#/active" :class="filterClass('active')">Active</a>
      </li>
      <li>
        <a href="#/completed" :class="filterClass('completed')">Completed</a>
      </li>
    </ul>
  </template>
  
  <script setup>
  const props = defineProps({
    visibility: String,
  });
  
  function filterClass(filter) {
    return props.visibility === filter
      ? 'font-semibold text-blue-500'
      : 'text-gray-600 hover:text-blue-500';
  }
  </script>
  