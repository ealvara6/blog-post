import { AxiosError } from 'axios'

export const parseErrorMessage = (err: unknown): string => {
  if (typeof err === 'string') return err

  if (err instanceof AxiosError) {
    console.log(err)
    const message = err.response?.data.error || err.message
    throw message
  }
  if (err instanceof Error) return err.message

  return 'An unexpected error occurred'
}
