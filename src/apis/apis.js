import axios from 'axios'
export const getExpense = async (expenseId) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses/${expenseId}`,
  )
  return response.data
}

export const getExpenses = async () => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses`,
  )
  return response.data
}

export const putExpense = async (expenseId, data) => {
  const response = await axios.put(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses/${expenseId}`,
    data,
  )
  return response.data
}

export const postExpense = async (data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses`,
    data,
  )
  return response.data
}

export const deleteExpense = async (expenseId) => {
  const response = await axios.delete(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses/${expenseId}`,
  )
  return response.data
}

export const getTotals = async () => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/expenses/totals`,
  )
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get(`${process.env.VUE_APP_API_ENDPOINT}/users`)
  return response.data
}

export const getCategories = async () => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_ENDPOINT}/categories`,
  )
  return response.data
}

export const postCategory = async (data) => {
  const response = await axios.post(
    `${process.env.VUE_APP_API_ENDPOINT}/categories`,
    data,
  )
  return response.data
}
