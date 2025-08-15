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
          <MenuButton className="flex justify-center gap-0 rounded-md sm:w-30">
            <UserCircleIcon className="w-10 md:w-12" />
            <ChevronDownIcon className="w-5" />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            modal={false}
            className="dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme dark:bg-background-darkTheme bg-background z-50 mt-2 w-36 rounded border p-2 text-center text-lg sm:w-(--button-width)"
          >
            <MenuItem>
              <button
                className="h-12 cursor-pointer tracking-wide"
                onClick={() => navigate('/posts/create')}
              >
                Create Post
              </button>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <button
                className="h-12 cursor-pointer tracking-wide"
                onClick={() => navigate(`/profile/${authUser.username}`)}
              >
                My Profile
              </button>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <button
                className="h-12 cursor-pointer tracking-wide"
                onClick={() => navigate({ pathname: '/account' })}
              >
                Account
              </button>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <button
                className="h-12 cursor-pointer tracking-wide"
                onClick={() => navigate({ pathname: '/history' })}
              >
                History
              </button>
            </MenuItem>
            <MenuSeparator className="dark:bg-border-darkTheme bg-border my-1 h-px" />
            <MenuItem>
              <button
                className="h-12 cursor-pointer tracking-wide"
                onClick={() => handleLogout()}
              >
                Sign Out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
    </>
  )
}
