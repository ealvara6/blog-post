import { useAuth } from '@/context/AuthProvider/useAuth'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from '@headlessui/react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Link } from '../Shared/Link'

export const Account = () => {
  const { authUser, logout } = useAuth()
  const { openLoginModal } = useLoginModal()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ pathname: '/' }, { replace: true })
  }

  return (
    <>
      {!authUser ? (
        <UserCircleIcon
          className="w-10 sm:w-12"
          onClick={() => openLoginModal()}
        />
      ) : (
        <Menu>
          <MenuButton className="flex items-center justify-center gap-0 rounded-md sm:w-30">
            <UserCircleIcon className="w-10 md:w-12" />
            <ChevronDownIcon className="w-5 self-center" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            modal={false}
            className="dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background z-50 mt-2 flex w-36 flex-col gap-2 rounded border p-2 text-center text-lg sm:w-(--button-width)"
          >
            <MenuItem>
              <Link
                className="mt-2 cursor-pointer text-base tracking-wide sm:text-lg"
                onClick={() => navigate('/posts/create')}
              >
                Create Post
              </Link>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <Link
                className="mt-2 cursor-pointer text-base tracking-wide sm:text-lg"
                onClick={() => navigate(`/profile/${authUser.username}`)}
              >
                My Profile
              </Link>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <Link
                className="mt-2 cursor-pointer text-base tracking-wide sm:text-lg"
                onClick={() => navigate({ pathname: '/account' })}
              >
                Account
              </Link>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <Link
                className="mt-2 cursor-pointer text-base tracking-wide sm:text-lg"
                onClick={() => navigate({ pathname: '/history' })}
              >
                History
              </Link>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <Link
                className="mt-2 cursor-pointer text-base tracking-wide sm:text-lg"
                onClick={() => handleLogout()}
              >
                Sign Out
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
    </>
  )
}
