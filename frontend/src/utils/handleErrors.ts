import { AxiosError } from 'axios'

export const handleErrors = (err: AxiosError<{ error: string }>) => {
  const message = err.response?.data.error || err.message
  throw message
}

export default handleErrors
