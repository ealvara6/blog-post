import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

type FormData = z.infer<typeof loginSchema>

const Login = () => {
  const [serverError, setServerError] = useState({ msg: '' })

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
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
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
        className={`cursor-pointer rounded p-1 text-lg font-semibold ${isSubmitting ? 'bg-gray-600' : 'bg-primary-dark'}`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      {serverError && <div className="text-red-500">{serverError.msg}</div>}
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
