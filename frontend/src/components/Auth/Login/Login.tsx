import { useAuth } from '@/context/AuthProvider/useAuth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from '@/components/Error'
import { Button } from '@/components/Button'
import clsx from 'clsx'

type FormData = z.infer<typeof loginSchema>

const Login = ({
  className,
  setIsOpenModal,
}: {
  className?: string
  setIsOpenModal?: React.Dispatch<React.SetStateAction<string | null>>
}) => {
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
      if (setIsOpenModal) setIsOpenModal(null)
      navigate({ pathname: '/' }, { replace: true })
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'dark:border-border-darkTheme dark:bg-card-darkTheme border-border bg-card flex size-fit w-full max-w-xl flex-col gap-4 rounded border p-4',
        className,
      )}
    >
      <div className="self-center text-3xl font-bold tracking-wide lg:text-5xl">
        Sign In
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-xl font-semibold lg:text-2xl">
          Email:
        </label>
        <input
          {...register('email')}
          type="text"
          className={`dark:border-border-darkTheme border-border rounded border-2 p-1 lg:text-xl ${errors.email ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border text-lg'}`}
          name="email"
          id="email"
          placeholder="Email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="password" className="text-xl font-semibold lg:text-2xl">
          Password:
        </label>
        <input
          {...register('password')}
          type="password"
          className={`dark:border-border-darkTheme border-border- rounded border-2 p-1 lg:text-xl ${errors.password ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border text-lg'}`}
          name="password"
          id="password"
          placeholder="Password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
      </div>
      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitting}
        className="text-xl tracking-wider"
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>
      {serverError && <Error>{serverError.msg}</Error>}
      <div className="dark:text-text-muted-darkTheme text-text-muted self-center text-center text-lg lg:text-xl">
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
