export function piniaPersistPlugin({ store }) {
    // Restore state from localStorage when the store is initialized
    const savedState = localStorage.getItem(store.$id);
    if (savedState) {
      store.$patch(JSON.parse(savedState));
    }
  
    // Save state to localStorage whenever it changes
    store.$subscribe((mutation, state) => {
      localStorage.setItem(store.$id, JSON.stringify(state));
    });
}