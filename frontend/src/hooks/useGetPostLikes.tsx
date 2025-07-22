import api from '@/api/axios'

export const useGetPostLikes = () => {
  return async (postId: number) => {
    const response = await api.get(`/posts/${postId}/like`)
    return response.data.likeCount
  }
}
