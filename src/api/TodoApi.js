// src/api/TodoApi.js

const API_BASE_URL = '/todos'

export const getTodos = async () => {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) {
      throw new Error('Failed to fetch todos')
    }
    const data = await response.json()
    return data.Data
  } catch (error) {
    console.error("Error fetching todos:", error)
    throw error
  }
}

export const createTodo = async (name) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) {
      throw new Error('Failed to create todo')
    }
    return await response.json()
  } catch (error) {
    console.error("Error creating todo:", error)
    throw error
  }
}

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete todo')
    }
    return await response.json()
  } catch (error) {
    console.error("Error deleting todo:", error)
    throw error
  }
}

export const updateTodo = async (todo) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
    if (!response.ok) {
      throw new Error('Failed to update todo')
    }
    return await response.json()
  } catch (error) {
    console.error("Error updating todo:", error)
    throw error
  }
}
