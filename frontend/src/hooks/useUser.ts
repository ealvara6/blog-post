import { useEffect, useState } from 'react'
import { User } from '@/types/posts'
import api from '@/api/axios'
import { parseErrorMessage } from '@/utils/parseErrorMessage'

export const useUser = (id: string) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get(`users/${id}`)
        setUser(result.data.user)
      } catch (err) {
        parseErrorMessage(err)
      }
    }
    fetchUser()
  }, [id])

  return { user }
}

export default useUser
