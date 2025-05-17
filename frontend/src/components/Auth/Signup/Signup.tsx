import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

type FormData = z.infer<typeof signupSchema>
type FieldName = keyof FormData

export interface SignUpInterface {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const fields = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
] satisfies { name: FieldName; label: string; type: string }[]

const Signup = () => {
  const { signup } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(signupSchema) })

  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data)
      navigate('/')
    } catch (err) {
      setServerError(parseErrorMessage(err))
    }
  }
  return (
    <form
      className="border-border-light bg-background-dark text-text-dark flex size-fit w-md flex-col gap-2 border p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map(({ name, label, type }) => {
        return (
          <div className="flex flex-col gap-1">
            <label htmlFor={label}>{label}: </label>
            <input
              {...register(name)}
              className={`bg-background-light text-text-light rounded border-2 p-1 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              type={type}
              name={name}
              id={name}
              placeholder={name}
            />
            {errors[name] && (
              <p className="text-red-500">{errors[name]?.message}</p>
            )}
          </div>
        )
      })}
      {serverError && <div className="text-red-500">{serverError}</div>}
      <button
        type="submit"
        className={`mt-2 rounded p-1 text-lg font-semibold ${isSubmitting ? 'bg-gray-600' : 'bg-primary-dark'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}

export default Signup
