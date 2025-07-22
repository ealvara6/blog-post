import api from '@/api/axios'

export const useGetPostLikes = () => {
  return async (postId: number) => {
    const response = await api.get(`/posts/${postId}/likes`)
    return response.data.likeCount
  }
}
