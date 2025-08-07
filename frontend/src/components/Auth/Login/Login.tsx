import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/validations/authValidations'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Error } from '@/components/Shared/Error'
import { Button } from '@/components/Shared/Button'
import clsx from 'clsx'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'
import { useNavigate } from 'react-router'

type FormData = z.infer<typeof loginSchema>

const Login = ({ className }: { className?: string }) => {
  const [serverError, setServerError] = useState({ msg: '' })
  const navigate = useNavigate()
  const { authUser } = useAuth()

  if (authUser) navigate(-1)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

  const { login } = useAuth()
  const { closeLoginModal } = useLoginModal()

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password)
      closeLoginModal()
    } catch (err) {
      setServerError({ msg: parseErrorMessage(err) })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'dark:border-border-darkTheme dark:bg-card-darkTheme border-border bg-card mx-3 flex size-fit w-full max-w-4xl flex-col gap-3 rounded border p-4 py-8',
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
          className={`dark:border-border-darkTheme border-border rounded border-2 p-2 lg:text-xl ${errors.email ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border text-lg'}`}
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
          className={`dark:border-border-darkTheme border-border- rounded border-2 p-2 lg:text-xl ${errors.password ? 'dark:border-error-darkTheme border-error' : 'dark:border-border-darkTheme border-border text-lg'}`}
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
        isInactive={!isSubmitting}
        className={`h-12 text-xl tracking-wider md:h-14`}
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
