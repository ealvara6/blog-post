import {
  deleteUser,
  getLikedComments,
  getLikedPosts,
  getUser,
  getUserComments,
  getUserPosts,
  getUserProfile,
  updateAvatar,
  updateUser,
} from '@/api/userApi'
import { User } from '@/types/posts'
import { EditUser } from '@/types/user'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export const useGetUser = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60,
  })
}

export const useUserProfile = (username?: string) => {
  return useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => getUserProfile(username),
    staleTime: 1000 * 60,
  })
}

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

export const useLikedPosts = () => {
  return useInfiniteQuery({
    queryKey: ['likedPosts'],
    initialPageParam: null,
    queryFn: ({ pageParam }) => getLikedPosts(pageParam),
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  })
}

export const useLikedComments = () => {
  return useInfiniteQuery({
    queryKey: ['likedComments'],
    initialPageParam: null,
    queryFn: ({ pageParam }) => getLikedComments(pageParam),
    getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
  })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => updateAvatar(file),
    onSuccess: (data) => {
      queryClient.setQueryData(['me'], (old: { user: User }) =>
        old
          ? { user: { ...old.user, profilePictureUrl: data.profilePictureUrl } }
          : old,
      )
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userComments'] })
    },
    onError: (err) => {
      throw parseErrorMessage(err)
    },
  })
}
