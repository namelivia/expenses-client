import axios from 'axios'
export const getExpense = async (expenseId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses/${expenseId}`,
  )
  return response.data
}

export const getExpenses = async (page) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses?page=${page}`,
  )
  return response.data
}

export const putExpense = async (expenseId, data) => {
  const response = await axios.put(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses/${expenseId}`,
    data,
  )
  return response.data
}

export const postExpense = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses`,
    data,
  )
  return response.data
}

export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses/${expenseId}`,
  )
  return response.data
}

export const getTotals = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/expenses/totals`,
  )
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/users`,
  )
  return response.data
}

export const getCategories = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/categories`,
  )
  return response.data
}

export const postCategory = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_ENDPOINT}/categories`,
    data,
  )
  return response.data
}
