import {
  deleteUser,
  getUserComments,
  getUserPosts,
  updateUser,
} from '@/api/userApi'
import { EditUser } from '@/types/user'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUserComments = (userId?: number) => {
  return useQuery({
    queryKey: ['userComments', userId],
    queryFn: () => getUserComments(),
    staleTime: 1000 * 60,
    enabled: !!userId,
  })
}

export const useUserPosts = (userId?: number) => {
  return useQuery({
    queryKey: ['userPosts', userId],
    queryFn: () => getUserPosts(),
    staleTime: 1000 * 60,
    enabled: !!userId,
  })
}

export const useDeleteUser = (userId?: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userComments', userId] })
      queryClient.invalidateQueries({ queryKey: ['userPosts', userId] })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: EditUser) => updateUser(data),
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}
