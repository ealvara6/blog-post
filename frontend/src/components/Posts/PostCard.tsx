import { Post } from '@/types/posts'
import { useNavigate } from 'react-router-dom'
import { CategoriesList } from '@/components/Category/CategoriesList'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import {
  MenuButton,
  Menu,
  MenuItems,
  MenuItem,
  MenuSeparator,
} from '@headlessui/react'
import React, { useState } from 'react'
import { DeletePostModal } from '@/components/Posts/DeletePostModal'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Hearts } from '@/components/Shared/Hearts'
import { useComments } from '@/hooks/useComments'
import { Link } from '../Shared/Link'
import {
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/16/solid'
import toast from 'react-hot-toast'

export const PostCard = ({
  post,
  handleNavigate,
  isFetching,
}: {
  post: Post
  handleNavigate?: boolean
  isFetching?: boolean
}) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<string | null>(null)
  const { authUser } = useAuth()
  const { title, content, id, user, categories, userId } = post
  const { data } = useComments(id)
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

  const handleNavigation = (e: React.MouseEvent, url: string) => {
    e.stopPropagation()
    const selection = window.getSelection()

    if (selection && selection.toString().length > 0) {
      return
    }

    navigate(url)
  }

  const copyToClipBoard = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await toast.promise(navigator.clipboard.writeText(window.location.href), {
      loading: 'Copying to ClipBoard...',
      success: 'Copied to clipboard',
      error: 'Failed to copy to clipboard',
    })
  }

  const MenuComponent = () => {
    return (
      <Menu>
        <MenuButton>
          <EllipsisHorizontalIcon className="w-8 cursor-pointer" />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className='dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background sm:w-(--button-width)" flex w-28 flex-col gap-2 rounded border p-2 text-center text-lg tracking-wide sm:w-36'
        >
          <MenuItem>
            <Link onClick={() => handleEdit()} className="cursor-pointer">
              Edit
            </Link>
          </MenuItem>
          <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
          <MenuItem>
            <Link onClick={() => handleDelete()} className="cursor-pointer">
              Delete
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    )
  }

  return (
    <div
      className={`dark:bg-card-darkTheme bg-card flex flex-col gap-5 transition-opacity ${isFetching ? 'opacity-50' : 'opacity-100'}`}
    >
      <div
        className={`border-border-darkTheme flex h-full flex-col rounded border p-3`}
        onClick={(e) => handleNavigate && handleNavigation(e, `/posts/${id}`)}
      >
        <div className="dark:border-border-darkTheme flex flex-col gap-2 border-b px-2 pt-2 pb-4 sm:px-3 sm:pt-3">
          <div className="flex justify-between">
            <div className="grow text-xl font-bold sm:text-2xl">{title}</div>
            {!handleNavigate && authUser?.id === userId && <MenuComponent />}
          </div>
          <div
            className="dark:text-text-muted-darkTheme text-text-muted w-fit cursor-default font-thin underline-offset-4 hover:underline"
            onClick={(e) =>
              handleNavigation(e, `/profile/${post.user.username}`)
            }
          >
            {user.username}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              {categories && <CategoriesList categories={categories} />}
            </div>
          </div>
        </div>
        <div
          className={`dark:text-text-primary-darkTheme/80 text-text-primary/80 grow p-1 overflow-ellipsis ${handleNavigate ? 'line-clamp-4' : ''} p-4 indent-2`}
        >
          {content}
        </div>
        <div className="flex flex-col justify-between py-3 text-end font-mono font-thin">
          <div className="dark:text-text-muted-darkTheme text-text-muted flex gap-10 font-semibold tracking-wider">
            <Hearts id={id} />
            <div
              className={`flex items-center gap-2 select-none ${handleNavigate ? 'block' : 'hidden'}`}
            >
              {data?.comments.length === 0 ? '0' : `${data?.comments.length}`}{' '}
              <span>
                <ChatBubbleBottomCenterTextIcon className='className="block sm:hidden" w-7' />
              </span>
            </div>
            <button
              className="dark:border-border-darkTheme flex cursor-pointer items-center gap-2 rounded-full border p-2 transition hover:-translate-y-0.5 hover:bg-gray-700 active:-translate-y-0"
              onClick={(e) => copyToClipBoard(e)}
            >
              <ArrowUturnRightIcon className="w-5" />
              Share
            </button>
          </div>
        </div>
      </div>
      {isOpen && <DeletePostModal setIsOpen={setIsOpen} id={id} />}
    </div>
  )
}

export default PostCard
