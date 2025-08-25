import { Bars3Icon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react'
import { MenuMobile } from './MenuMobile'
import { Menu } from './Menu'
import { useNavigate } from 'react-router-dom'
import { Account } from './Account'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { Link } from '../Shared/Link'
import Logo from '@/assets/postifly-logo.svg?react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { authUser } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  const menuToggle = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 5)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`dark:text-text-primary-darkTheme text-text-primary border-border dark:border-border/5 fixed top-0 left-0 z-20 flex min-h-18 w-full border-b p-2 ${scrolled ? 'shadow-lg backdrop-blur-lg' : 'shadow-none backdrop-blur-none'} bg-transparent transition-all duration-300`}
      >
        <div className="z-20 flex min-h-full grow items-center justify-between">
          <div className="block sm:hidden">
            <Bars3Icon className="w-10" onClick={() => menuToggle()} />
          </div>
          <div className="hidden sm:block">
            <Menu />
          </div>
          <div
            className={`absolute left-1/2 flex -translate-x-1/2 cursor-pointer self-center select-none`}
            onClick={() => navigate({ pathname: '/' }, { replace: true })}
          >
            <Logo className="text-text-primary dark:text-text-primary-darkTheme h-12 w-12 sm:h-14 sm:w-14" />
            <span className="self-center text-xl font-bold tracking-widest sm:text-2xl md:text-3xl">
              Postifly
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
      </nav>
      <div className="block sm:hidden">
        <MenuMobile
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          menuToggle={menuToggle}
        />
      </div>
    </>
  )
}

export default Navbar
