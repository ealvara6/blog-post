import api from '@/api/axios'

export const useCreateLikePost = () => {
  return async (postId: number) => {
    const response = await api.post(`/posts/${postId}/like`)
    return response.data.like
  }
}
