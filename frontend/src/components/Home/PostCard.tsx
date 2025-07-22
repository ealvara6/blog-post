import { useAuth } from '@/context/AuthProvider/useAuth'
import { useGetPostLiked } from '@/hooks/useGetPostLiked'
import { useGetPostLikes } from '@/hooks/useGetPostLikes'
import { Comment } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { HeartIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'
import { useCreateLikePost } from '@/hooks/useCreateLikePost'
import { useDeleteLikePost } from '@/hooks/useDeleteLikePost'

export const PostCard = ({
  title,
  content,
  id,
  comments,
}: {
  title: string
  content: string
  id: number
  comments: Comment[] | undefined
}) => {
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const { openLoginModal } = useLoginModal()
  const [postLikes, setPostLikes] = useState(0)
  const [postLiked, setPostLiked] = useState(false)
  const [error, setError] = useState(true)
  const getPostLikes = useGetPostLikes()
  const getPostLiked = useGetPostLiked()
  const createLikePost = useCreateLikePost()
  const deleteLikePost = useDeleteLikePost()

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
  }, [id])

  const Hearts = () => {
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
    <div
      className="dark:border-border-darkTheme dark:bg-card-darkTheme bg-card flex h-[400px] w-full flex-col gap-8 overflow-hidden rounded border px-3 py-5"
      onClick={() => navigate(`/posts/${id}`)}
    >
      <div className="text-2xl md:text-3xl">{title}</div>
      <div className="dark:text-text-primary-darkTheme/80 text-text-primary/80 line-clamp-6 text-lg">
        {content}
      </div>
      <div className="dark:text-text-muted-darkTheme text-text-muted flex grow items-end justify-between gap-3 font-semibold tracking-wider sm:text-lg">
        {error && <Hearts />}
        <div>
          {comments?.length === 0 ? '0' : `${comments?.length}`} Comments
        </div>
      </div>
    </div>
  )
}
