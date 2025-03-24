import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider/useAuth'

export interface SignUpInterface {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const { signup } = useAuth()
  const [formData, setFormData] = useState<SignUpInterface>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const navigate = useNavigate()

  const onChange = (data: { name: string; value: string }) => {
    const { name, value } = data
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    signup(formData)
    navigate('/')
  }
  return (
    <form
      className="border-border-light bg-background-dark text-text-dark flex size-fit w-md flex-col gap-2 border p-4"
      onSubmit={handleSubmit}
    >
      <input
        className="bg-background-light text-text-light"
        type="text"
        name="username"
        id="username"
        placeholder="username"
        onChange={(e) => onChange(e.target)}
      />
      <input
        className="bg-background-light text-text-light"
        type="text"
        name="email"
        id="email"
        placeholder="email"
        onChange={(e) => onChange(e.target)}
      />
      <input
        className="bg-background-light text-text-light"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={(e) => onChange(e.target)}
      />
      <input
        className="bg-background-light text-text-light"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        onChange={(e) => onChange(e.target)}
      />
      <button type="submit" className="bg-primary-dark">
        Submit
      </button>
    </form>
  )
}

export default Signup
