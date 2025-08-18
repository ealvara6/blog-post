import { Bars3Icon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { useNavigate } from 'react-router-dom'
import { Account } from './Account'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Link } from '../Shared/Link'
import Logo from '@/assets/Postfily-Logo.svg?react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { authUser } = useAuth()

  const menuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <nav className="dark:text-text-primary-darkTheme text-text-primary border-border dark:border-border/5 flex min-h-18 border-b p-2">
      <div className="flex min-h-full grow items-center justify-between">
        <div className="block sm:hidden">
          <Bars3Icon className="w-10" onClick={() => menuToggle()} />
        </div>
        <div className="hidden sm:block">
          <Menu />
        </div>
        <div
          className={`absolute left-1/2 flex -translate-x-1/2 cursor-pointer gap-2 self-center select-none`}
          onClick={() => navigate({ pathname: '/' }, { replace: true })}
        >
          <Logo className="text-text-primary dark:text-text-primary-darkTheme h-10" />
          <span className="self-center text-2xl font-bold tracking-widest sm:text-3xl md:text-4xl">
            Postfily
          </span>
        </div>
        <div className="flex gap-3 text-lg font-bold">
          {authUser && (
            <Link
              className="hidden self-center text-xl font-normal sm:block lg:text-2xl"
              onClick={() => navigate({ pathname: '/posts/create' })}
            >
              Create Post
            </Link>
          )}

          <Account />
        </div>
      </div>
      <div className="block sm:hidden">
        <MenuMobile
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          menuToggle={menuToggle}
        />
      </div>
    </nav>
  )
}

export default Navbar
