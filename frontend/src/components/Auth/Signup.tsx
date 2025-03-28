import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { FormErrors } from '../../types/errors'

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
  const [errors, setErrors] = useState<FormErrors[]>([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onChange = (data: { name: string; value: string }) => {
    const { name, value } = data
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await signup(formData)
      navigate('/')
    } catch (err: unknown) {
      if (Array.isArray(err)) {
        setErrors(err as FormErrors[])
      } else {
        console.log('An unexpected error occurred: ', err)
        setErrors([{ msg: 'An unexpected error occurred' }])
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <form
      className="border-border-light bg-background-dark text-text-dark flex size-fit w-full w-md flex-col gap-2 border p-4"
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
      <button type="submit" className="bg-primary-dark" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
      {errors.length !== 0 && (
        <div className="text-red-500">
          {errors.map((error, key) => (
            <div key={key}>{error.msg}</div>
          ))}
        </div>
      )}
    </form>
  )
}

export default Signup
