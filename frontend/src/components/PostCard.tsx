import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { CategoriesList } from './CategoriesList'
import { format } from 'date-fns'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
  MenuButton,
  Menu,
  MenuItems,
  MenuItem,
  MenuSeparator,
} from '@headlessui/react'
import { useState } from 'react'
import { DeletePostModal } from './DeletePostModal'
import { useAuth } from '@/context/AuthProvider/useAuth'

export const PostCard = ({
  post,
  handleNavigate,
}: {
  post: Post
  handleNavigate?: boolean
}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const { authUser } = useAuth()
  const { title, content, createdAt, id, user, categories, userId } = post
  const date = format(new Date(createdAt), 'MMM dd, yyy  • h:mm a')

  const handleEdit = () => {
    const categoryIds = categories?.map((category) => category.id)
    navigate(`/posts/${id}/edit`, {
      state: { title, content, userId, id, categoryIds },
    })
  }

  const handleDelete = async () => {
    try {
      setIsOpen('open')
    } catch (err: unknown) {
      console.log(err)
    }
  }

  const MenuComponent = () => {
    return (
      <Menu>
        <MenuButton>
          <EllipsisHorizontalIcon className="w-8 cursor-pointer" />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className='dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background sm:w-(--button-width)" w-28 rounded border p-2 text-center text-lg tracking-wide sm:w-36'
        >
          <MenuItem>
            <button
              onClick={() => handleEdit()}
              className="h-12 cursor-pointer"
            >
              Edit
            </button>
          </MenuItem>
          <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
          <MenuItem>
            <button
              onClick={() => handleDelete()}
              className="h-12 cursor-pointer"
            >
              Delete
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`border-border-darkTheme flex flex-col rounded border ${handleNavigate && 'cursor-pointer'}`}
        onClick={() => handleNavigate && navigate(`/posts/${id}`)}
      >
        <div className="dark:border-border-darkTheme flex flex-col gap-2 border-b px-2 pt-2 pb-4 sm:px-3 sm:pt-3">
          <div className="flex justify-between">
            <div className="grow text-xl font-bold sm:text-2xl">{title}</div>
            {!handleNavigate && authUser?.id === userId && <MenuComponent />}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              {categories && <CategoriesList categories={categories} />}
            </div>
            <div className="text-md hidden font-semibold sm:block md:text-lg">
              Posted by: <span className="font-thin">{user.username}</span>
            </div>
          </div>
        </div>
        <div className="dark:text-text-primary-darkTheme/80 text-text-primary/80 grow p-3">
          {content}
        </div>
        <div className="hidden flex-col justify-between p-3 text-end font-mono font-thin sm:flex">
          <div className="flex justify-between">
            <div className="dark:text-text-muted-darkTheme text-text-muted font-semibold tracking-wider">
              {!post.comments?.length ? '0' : post.comments?.length} Comments
            </div>
            <div className="flex gap-3">
              <span className="text-lg font-semibold">Posted At: </span>
              <div className="mt-[1px] self-center">{date}</div>
            </div>
          </div>
        </div>
        <div className="dark:text-text-muted-darkTheme text-text-muted self-end p-3 font-semibold tracking-wider sm:hidden">
          {!post.comments?.length ? '0' : post.comments?.length} Comments
        </div>
      </div>
      {isOpen && <DeletePostModal setIsOpen={setIsOpen} id={id} />}
    </div>
  )
}

export default PostCard
