import { AxiosError } from 'axios'

export const handleErrors = (err: AxiosError<{ errors: string }>) => {
  const message = err.response?.data.errors || err.message
  throw message
}

export default handleErrors
