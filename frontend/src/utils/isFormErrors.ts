import { FormErrors } from '@/types/errors'

export const isFormError = (err: unknown): err is FormErrors[] => {
  return Array.isArray(err) && err.every((e) => typeof e.msg === 'string')
}
