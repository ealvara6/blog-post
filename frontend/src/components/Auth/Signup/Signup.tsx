import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormErrors } from '@/types/errors'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupSchema } from '@/validations/authValidations'

type FormData = z.infer<typeof signupSchema>
type FieldName = keyof FormData

export interface SignUpInterface {
  username: string
  email: string
  password: string
}

const fields = [
  { name: 'username', label: 'Username', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'ConfirmPassword', type: 'password' },
] satisfies { name: FieldName; label: string; type: string }[]

const Signup = () => {
  const { signup } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(signupSchema) })

  const [serverErrors, setServerErrors] = useState<FormErrors[]>([])
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data)
      navigate('/')
    } catch (err: unknown) {
      if (Array.isArray(err)) {
        setServerErrors(err as FormErrors[])
      } else {
        setServerErrors([{ msg: 'An unexpected error occurred' }])
      }
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
      <button
        type="submit"
        className={`mt-2 rounded p-1 text-lg font-semibold ${isSubmitting ? 'bg-gray-600' : 'bg-primary-dark'}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>
      {serverErrors.length !== 0 && (
        <div className="text-red-500">
          {serverErrors.map((error, key) => (
            <div key={key}>{error.msg}</div>
          ))}
        </div>
      )}
    </form>
  )
}

export default Signup
