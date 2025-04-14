import { EditPostForm } from '@/components/EditPostForm'
import { useLocation } from 'react-router-dom'

export const EditPost = () => {
  const location = useLocation()
  const { title, content, userId, id } = location.state || {}
  return (
    <EditPostForm title={title} content={content} userId={userId} id={id} />
  )
}
