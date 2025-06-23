import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from '@/components/Errors'
import { Button } from '@/components/Button'
import clsx from 'clsx'

type FormData = z.infer<typeof loginSchema>

const Login = ({ className }: { className?: string }) => {
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
      className={clsx(
        'dark:border-border-darkTheme dark:bg-background-darkTheme border-border bg-background flex size-fit w-full flex-col gap-4 rounded border p-4',
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-semibold">
          Email:
        </label>
        <input
          {...register('email')}
          type="text"
          className={`dark:border-border-darkTheme border-border rounded border-2 p-1 ${errors.email ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border'}`}
          name="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="font-semibold">
          Password:
        </label>
        <input
          {...register('password')}
          type="password"
          className={`dark:border-border-darkTheme border-border- rounded border-2 p-1 ${errors.password ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border'}`}
          name="password"
          id="password"
          placeholder="Password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
      </div>
      <Button variant="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
      {serverError && <Error>{serverError.msg}</Error>}
      <div className="dark:text-text-muted-darkTheme text-text-muted self-center text-center">
        Don't have an account?
        <br />
        <a
          className="dark:text-accent-darkTheme dark:hover:text-accent-hover-darkTheme text-accent hover:text-accent-hover"
          href="/signup"
        >
          Sign Up
        </a>
      </div>
    </form>
  )
}

export default Login
