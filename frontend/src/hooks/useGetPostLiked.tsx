import api from '@/api/axios'

export const useGetPostLiked = () => {
  return async (postId: number) => {
    const response = await api.get(`/auth/posts/${postId}/like/me`)
    return response.data.liked
  }
}
