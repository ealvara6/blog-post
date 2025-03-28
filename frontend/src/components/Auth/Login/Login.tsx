import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'
import { FormErrors } from '../../../types/errors'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors[]>([])
  const { login } = useAuth()
  const navigate = useNavigate()

  const onEmailChange = (value: string) => {
    setEmail(value)
  }

  const onPasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err: unknown) {
      if (Array.isArray(err)) {
        setErrors(err as FormErrors[])
      } else {
        setErrors([{ msg: 'An unexpected error occurred' }])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border-light bg-background-dark text-text-dark flex size-fit w-full flex-col gap-2 border p-4 sm:w-lg"
    >
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        className="bg-background-light text-text-light"
        name="email"
        id="email"
        placeholder="email"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        className="bg-background-light text-text-light"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <button className="bg-primary-dark" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {errors.length !== 0 && (
        <div>
          {errors.map((error, key) => (
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
