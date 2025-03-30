import { useAuth } from '@/context/AuthProvider/useAuth'
import { FormErrors } from '@/types/errors'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validations/authValidations'

type FormData = z.infer<typeof loginSchema>

const Login = () => {
  const [serverErrors, setServerErrors] = useState<FormErrors[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
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
      onSubmit={handleSubmit(onSubmit)}
      className="border-border-light bg-background-dark text-text-dark flex size-fit w-full flex-col gap-2 border p-4 sm:w-lg"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email:</label>
        <input
          {...register('email')}
          type="text"
          className={`bg-background-light text-text-light rounded border-2 p-1 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          name="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password:</label>
        <input
          {...register('password')}
          type="password"
          className={`bg-background-light text-text-light rounded border-2 p-1 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          name="password"
          id="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        className="bg-primary-dark cursor-pointer rounded p-1 text-lg font-semibold"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      {serverErrors.length !== 0 && (
        <div>
          {serverErrors.map((error, key) => (
            <div className="text-red-500" key={key}>
              {error.msg}
            </div>
          ))}
        </div>
      )}
      <div className="self-center">
        Don't have an account?{' '}
        <a className="text-accent" href="/signup">
          Sign Up
        </a>
      </div>
    </form>
  )
}

export default Login
