import { CommentItem } from '@/components/Comment/CommentItem'
import PostCard from '@/components/Posts/PostCard'
import { useUserProfile } from '@/hooks/useUser'
import { Comment, Post } from '@/types/posts'
import { toImageUrl } from '@/utils/imageUrl'
import {
  ChatBubbleBottomCenterIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export const Profile = () => {
  const navigate = useNavigate()
  const { username } = useParams<{ username: string }>()
  const { data, isLoading } = useUserProfile(username)
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem('profileView')
    const value = saved || '1'
    return value
  })

  useEffect(() => {
    localStorage.setItem('profileView', selected)
  }, [selected])

  if (isLoading) return <div>Loading...</div>
  if (data.user === null) return <div>Failed to fetch user</div>

  const numOfPosts = data.user.posts.length
  const numOfComments = data.user.comments.length

  const Posts = () => {
    if (data.user.posts.length === 0)
      return (
        <div className="text-center text-base font-semibold tracking-wider sm:text-lg md:text-xl">
          User has no posts
        </div>
      )
    const postItems = data.user.posts.map((post: Post) => (
      <PostCard post={post} handleNavigate key={post.id} />
    ))

    return <>{postItems}</>
  }

  const Comments = () => {
    if (data.user.comments.length === 0)
      return (
        <div className="text-center text-base font-semibold tracking-wider sm:text-lg md:text-xl">
          User has no comments
        </div>
      )
    const commentItems = data.user.comments.map((comment: Comment) => (
      <div
        key={comment.id}
        onClick={() => navigate(`/posts/${comment.postId}`)}
      >
        <CommentItem comment={comment} index={comment.id} profileView />
      </div>
    ))

    return <>{commentItems}</>
  }

  const options = [
    {
      id: '1',
      name: 'Posts',
      component: <Posts />,
    },
    {
      id: '2',
      name: 'Comments',
      component: <Comments />,
    },
  ]

  return (
    <div className="dark:border-border-darkTheme border-border mx-3 w-full max-w-xl border p-3 py-12 sm:max-w-3xl">
      <div className="grid grid-cols-2 grid-rows-[min-content-auto] items-center gap-5 p-3 sm:grid-rows-[2fr_1fr] sm:gap-0 sm:gap-y-5">
        <img
          src={toImageUrl(data.user.profilePictureUrl)}
          alt="User's profile picture"
          className="sm:row-span-full2 col-span-full w-36 justify-self-center rounded-full sm:col-span-1"
        />
        <div className="col-span-full text-center text-2xl font-bold tracking-wider sm:col-start-2 sm:row-start-1 sm:text-2xl md:text-3xl">
          {data.user.username}
        </div>

        <div className="dark:text-text-muted-darkTheme text-text-muted flex flex-col items-center text-center text-base font-semibold tracking-wider md:text-lg">
          <div className="flex gap-2">
            {numOfPosts} <PencilSquareIcon className="w-8" />
          </div>
          <div>Post{numOfPosts !== 1 && 's'}</div>
        </div>
        <div className="dark:text-text-muted-darkTheme text-text-muted flex flex-col items-center text-center text-base font-semibold tracking-wider md:text-lg">
          <div className="flex gap-2">
            {numOfComments} <ChatBubbleBottomCenterIcon className="w-8" />
          </div>
          Comment{numOfComments !== 1 && 's'}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="dark:border-border-darkTheme border-border flex justify-around border-b p-3">
          {options.map((option) => (
            <div
              onClick={() => setSelected(option.id)}
              className={`${selected === option.id ? 'font-bold' : 'font-light'} cursor-pointer text-base tracking-wider select-none sm:text-lg md:text-xl`}
              key={option.id}
            >
              {option.name}
            </div>
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          {options.find((option) => option.id === selected)?.component}
        </div>
      </div>
    </div>
  )
}
