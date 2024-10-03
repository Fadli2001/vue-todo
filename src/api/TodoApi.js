import { getRequest, postRequest, putRequest, deleteRequest } from '@/shared/HttpService'

export const getTodos = async () => {
  return await getRequest('')
}

export const createTodo = async (name) => {
  return await postRequest('', { name })
}

export const updateTodo = async (todo) => {
  return await putRequest(``, todo)
}

export const deleteTodo = async (id) => {
  return await deleteRequest(`/${id}`)
}