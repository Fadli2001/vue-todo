import { defineStore } from "pinia";
import { getTodos, createTodo, deleteTodo, updateTodo } from '@/api/TodoApi'
// import watch disini
import { watch } from "vue";

export const useTodoStore = defineStore("todo", {
    state: () => ({
        todos: [],
        newTodo: '',
        visibility: 'all',
        editedTodo: null,
        beforeEditCache: ''
    }),
    getters: {
        filteredTodos: (state) => {
            const filters = {
                all: (todos) => todos,
                active: (todos) => todos.filter((todo) => !todo.isCompleted),
                completed: (todos) => todos.filter((todo) => todo.isCompleted),
            };
            return filters[state.visibility](state.todos);
        },
        remainingTodos: (state) => {
            return state.todos.filter(todo => !todo.isCompleted).length;
        }
    },
    actions: {
        // setupWatchers
        setupWatchers() {
            watch(
              () => this.newTodo,
              (newValue, oldValue) => {
                console.log(`newTodo berubah dari "${oldValue}" menjadi "${newValue}"`)
              }
            )
        },
        setupDeepWatcher() {
            watch(
              () => this.todos,
              (newTodos, oldTodos) => {
                console.log('Todos telah diperbarui:', newTodos)
              },
              { deep: true }
            )
        },
        setupEagerWatcher() {
            watch(
              () => this.visibility,
              (newVisibility, oldVisibility) => {
                console.log(`Visibility berubah dari ${oldVisibility} menjadi ${newVisibility}`)
              },
              { immediate: true }
            )
        },
        setupOnceWatcher() {
            const stopWatch = watch(
              () => this.todos,
              (newTodos) => {
                if (newTodos.some(todo => todo.isCompleted)) {
                  console.log('Selamat atas penyelesaian todo pertama Anda!')
                  stopWatch() // Hentikan watcher setelah dipicu sekali
                }
              },
              { deep: true }
            )
        },
        async fetchTodos() {
            try {
                const todos = await getTodos()
                this.todos = todos
                return todos
            } catch (error) {
                console.error("Failed to fetch todos:", error);
            }
        },
        async addTodo() {
            const todoName = this.newTodo.trim();
            if (todoName) {
                try {
                    await createTodo(todoName);
                    await this.fetchTodos();
                    this.newTodo = '';
                } catch (error) {
                    console.error("Failed to add todo:", error);
                }
            }
        },
        async removeTodo(todo) {
            try {
                const confirmed = confirm('Are you sure you want to delete this todo?');
                if (confirmed) {
                    await deleteTodo(todo.id);
                    await this.fetchTodos();
                }
            } catch (error) {
                console.error("Failed to delete todo:", error);
            }
        },
        async saveEditedTodo(todo) {
            try {
                await updateTodo({
                    id: todo.id,
                    name: todo.name,
                    isCompleted: todo.isCompleted,
                });
                this.editedTodo = null;
                await this.fetchTodos();
            } catch (error) {
                console.error("Failed to save edited todo:", error);
            }
        },
        async doCompleted(todo) {
            try {
                await updateTodo({
                    id: todo.id,
                    name: todo.name,
                    isCompleted: true,
                });
                alert("Todo is Updated");
                await this.fetchTodos();
            } catch (error) {
                console.error("Failed to complete todo:", error);
            }
        },
        markTodoAsEditing(todo) {
            this.editedTodo = todo;
            this.beforeEditCache = todo.name;
        },
        cancelEditing(todo) {
            this.editedTodo = null;
            todo.name = this.beforeEditCache;
        },
        toggleAllTodos(checked) {
            this.todos.forEach((todo) => (todo.isCompleted = checked));
        },
        clearCompletedTodos() {
            this.todos = this.todos.filter((todo) => !todo.isCompleted);
        },
        updateVisibility(route) {
            this.visibility = ['all', 'active', 'completed'].includes(route) ? route : 'all';
        }
    }
});