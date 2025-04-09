import { useEffect, useState } from 'react'
import { User } from '@/types/posts'
import api from '@/api/axios'
import { AxiosError } from 'axios'
import handleErrors from '@/utils/handleErrors'

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(`users/${id}`)
        setUser(result.data.user)
      } catch (err: unknown) {
        const error = err as AxiosError<{ errors: string }>
        handleErrors(error)
      }
    }
    fetchUser()
  }, [id])

  return { user }
}

export default useUser
