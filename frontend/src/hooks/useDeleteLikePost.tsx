import api from '@/api/axios'

export const useDeleteLikePost = () => {
  return async (postId: number) => {
    const response = await api.delete(`/auth/posts/${postId}/like`)
    return response.data.unlike
  }
}
