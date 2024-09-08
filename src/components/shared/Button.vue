<template>
    <button
      :class="[
        'px-4 py-2 rounded-md text-white focus:outline-none',
        colorClasses[color] || colorClasses.default,
        sizeClasses[size] || sizeClasses.default,
      ]"
      @click="$emit('click')"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    color: { type: String, default: 'blue' },
    size: { type: String, default: 'md' },
  });
  
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-800',
    red: 'bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-800',
    default: 'bg-gray-500 hover:bg-gray-600 focus:ring-2 focus:ring-gray-800',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
    default: 'px-4 py-2 text-md',
  };
  </script>
  