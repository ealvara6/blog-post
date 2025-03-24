import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onEmailChange = (value: string) => {
    setEmail(value)
  }

  const onPasswordChange = (value: string) => {
    setPassword(value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    login(email, password)

    navigate('/')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="border-border-light bg-background-dark text-text-dark flex size-fit w-2xl flex-col gap-2 border p-4"
      >
        <input
          type="text"
          className="bg-background-light text-text-light"
          name="email"
          id="email"
          placeholder="email"
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <input
          type="password"
          className="bg-background-light text-text-light"
          name="password"
          id="password"
          placeholder="password"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <button className="bg-primary-dark" type="submit">
          Submit
        </button>
        <div className="self-center">
          Don't have an account?{' '}
          <a className="text-accent" href="/signup">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  )
}

export default Login
