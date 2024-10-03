// src/services/HttpService.js
import { useFetch } from '@vueuse/core'

const API_BASE_URL = '/todos'

const jsonRequestOptions = (method, body) => ({
  method: method,
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getRequest = async (url) => {
  const { data, error } = await useFetch(`${API_BASE_URL}${url}`).get().json()    
  if (error.value) {
    throw new Error('Failed to fetch data')
  }
  return data.value.data
}

export const postRequest = async (url, body) => {
  const { data, error } = await useFetch(`${API_BASE_URL}${url}`, jsonRequestOptions('POST', body)).post().json()
  
  if (error.value) {
    throw new Error('Failed to post data')
  }
  return data
}

export const putRequest = async (url, body) => {
  const { data, error } = await useFetch(`${API_BASE_URL}${url}`, jsonRequestOptions('PUT', body)).put().json()

  if (error.value) {
    throw new Error('Failed to update data')
  }
  return data
}

export const deleteRequest = async (url) => {
  const { data, error } = await useFetch(`${API_BASE_URL}${url}`).delete().json()

  if (error.value) {
    throw new Error('Failed to delete data')
  }
  return data
}
