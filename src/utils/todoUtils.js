import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'

export function getTodoStats() {
  const todoStore = useTodoStore()
  const { todos } = storeToRefs(todoStore)

  const stats = computed(() => {
    const totalTodos = todos.value.length
    const completedTodos = todos.value.filter(todo => todo.isCompleted).length

    return {
      total: totalTodos,
      completed: completedTodos,
      remaining: totalTodos - completedTodos
    }
  })

  return { stats }
}