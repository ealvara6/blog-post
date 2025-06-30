import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from '@/components/Error'

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
      className="dark:border-border-darkTheme dark:bg-card-darkTheme border-border bg-card flex size-fit w-lg flex-col gap-2 rounded border-2 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="self-center text-2xl font-bold">Sign Up</div>
      {fields.map(({ name, label, type }) => {
        return (
          <div className="flex flex-col gap-1">
            <label htmlFor={label} className="text-xl font-semibold">
              {label}:{' '}
            </label>
            <input
              {...register(name)}
              className={`dark:text-text-primary-darkTheme text-text-primary border-border dark:border-border-darkTheme rounded border-2 p-1 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              type={type}
              name={name}
              id={name}
              placeholder={name}
            />
            {errors[name] && <Error>{errors[name].message}</Error>}
          </div>
        )
      })}
      {serverError && <Error>{serverError}</Error>}
      <button
        type="submit"
        className={`text-text-primary-darkTheme mt-2 rounded p-2 text-xl font-bold ${isSubmitting ? 'bg-gray-600' : 'dark:bg-accent-darkTheme bg-accent'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  )
}

export default Signup
