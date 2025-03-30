import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
})

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .min(4, 'Username must be at least 4 characters long'),
    email: z.string().trim().min(1, 'Email is required').email(),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(7, 'Password must be at least 7 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
