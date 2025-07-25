import { parseErrorMessage } from '@/utils/parseErrorMessage'
import api from './axios'

export const getCategories = async () => {
  try {
    const response = await api.get(`/categories`)
    return response.data.categories
  } catch (err) {
    throw parseErrorMessage(err)
  }
}
