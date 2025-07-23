import { useAuth } from '@/context/AuthProvider/useAuth'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'
import { useCreateLikePost } from '@/hooks/useCreateLikePost'
import { useDeleteLikePost } from '@/hooks/useDeleteLikePost'
import { useGetPostLiked } from '@/hooks/useGetPostLiked'
import { useGetPostLikes } from '@/hooks/useGetPostLikes'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { HeartIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export const Hearts = ({ id }: { id: number }) => {
  const { authUser } = useAuth()
  const { openLoginModal } = useLoginModal()
  const [postLikes, setPostLikes] = useState(0)
  const [postLiked, setPostLiked] = useState(false)
  const [error, setError] = useState(true)
  const getPostLikes = useGetPostLikes()
  const getPostLiked = useGetPostLiked()
  const deleteLikePost = useDeleteLikePost()
  const createLikePost = useCreateLikePost()

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        let postLiked = false
        const postLikes = await getPostLikes(id)
        if (authUser) postLiked = await getPostLiked(id)

        setPostLikes(postLikes)
        setPostLiked(postLiked)
      } catch (err) {
        setError(false)
        console.log(parseErrorMessage(err))
      }
    }

    fetchPostLikes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, authUser])

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!authUser) {
      openLoginModal()
      return
    }

    const nextLiked = !postLiked
    setPostLiked(nextLiked)
    setPostLikes((prev) => (nextLiked ? prev + 1 : prev - 1))

    try {
      if (!nextLiked) {
        await deleteLikePost(id)
      } else {
        await createLikePost(id)
      }
    } catch (err) {
      console.log(parseErrorMessage(err))
      setPostLiked(!nextLiked)
      setPostLikes((prev) => (nextLiked ? prev - 1 : prev + 1))
    }
  }

  return (
    <div className="flex gap-2">
      <HeartIcon
        className={`h-6 ${postLiked && 'dark:text-error-darkTheme text-error'}`}
        onClick={handleHeartClick}
      />
      {postLikes}
    </div>
  )
}
