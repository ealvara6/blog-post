import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import useUser from '@/hooks/useUser'
import { Post, Comment } from '@/types/posts'
import { Button } from './Button'
import { useDeletePost } from '@/hooks/useDeletePost'
import { useNavigate } from 'react-router-dom'

const getComments = (comments: Comment[] | undefined) => {
  if (!comments) return
  if (comments.length === 0)
    return <div className="text-center">No comments found</div>
  return comments.map((comment, key) => {
    const { user } = useUser(comment.userId.toString())
    const date = new Date(comment.createdAt)
    return (
      <div className="flex flex-col rounded border p-3" key={key}>
        <div className="text-xl font-bold">{user?.username}</div>
        <div>{comment.content}</div>
        <div className="self-end font-mono font-thin">
          <span className="font-bold">created at: </span>
          {date.toLocaleString()}
        </div>
      </div>
    )
  })
}

export const PostItem = ({
  title,
  content,
  createdAt,
  comments,
  id,
  userId,
  user,
}: Post) => {
  const { authUser } = useAuth()
  const deletePost = useDeletePost()
  const navigate = useNavigate()
  const date = new Date(createdAt)

  const handleDelete = async () => {
    try {
      console.log('deleting post...')
      await deletePost(id)
      console.log('post deleted')
      navigate('/posts')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const handleEdit = () => {
    navigate(`/posts/${id}/edit`, { state: { title, content, userId, id } })
  }

  const AuthButtons = () => {
    if (authUser?.id !== userId) return null

    return (
      <div className="flex gap-4 self-end">
        <Button onClick={() => handleEdit()}>Edit</Button>
        <Button variant="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="border-b-border-dark flex border p-3 text-2xl font-bold">
          <div className="grow">{title}</div>
          <div>Posted by: {user.username}</div>
        </div>
        <div className="border-b-border-dark border border-t-transparent p-3">
          {content}
        </div>
        <div className="border border-t-transparent p-3 text-end font-mono font-thin">
          <span className="font-semibold">Posted At:</span>{' '}
          {date.toLocaleString()}
        </div>
        <AuthButtons />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-4xl font-bold">Comments</div>
        {getComments(comments)}
      </div>
    </div>
  )
}

export default PostItem
