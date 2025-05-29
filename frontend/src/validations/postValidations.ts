import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  content: z.string().trim().min(1, 'Please enter a body content'),
  categoryIds: z.array(z.number()),
})

export default postSchema
