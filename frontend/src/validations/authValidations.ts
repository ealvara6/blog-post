import { z } from 'zod'

const passwordFields = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(7, 'Password must be at least 7 characters long'),
  confirmPassword: z.string(),
})

export const passwordSchema = passwordFields.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  },
)

export const emailSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email(),
})
export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .min(4, 'Username must be at least 4 characters long'),
})

export const loginSchema = emailSchema.extend({
  password: z.string().min(1, 'Password is required'),
})

export const signupSchema = usernameSchema
  .merge(emailSchema)
  .extend(passwordFields.shape)
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
