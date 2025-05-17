import { isAxiosError } from 'axios'

export const parseErrorMessage = (err: unknown): string => {
  console.log(err)
  if (typeof err === 'string') return err

  if (isAxiosError(err)) {
    const message = err.response?.data.error || err.message
    return message
  }
  if (err instanceof Error) return err.message

  return 'An unexpected error occurred'
}
