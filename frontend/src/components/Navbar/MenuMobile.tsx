import { XCircleIcon } from '@heroicons/react/16/solid'
import React, { useRef, useEffect, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import ThemeButton from '../ThemeButton/ThemeButton'

type MenuMobileProps = {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  menuToggle: () => void
}

export const MenuMobile = ({
  setIsOpen,
  isOpen,
  menuToggle,
}: MenuMobileProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  const handleNavigate = (link: string) => {
    menuToggle()
    navigate({ pathname: link })
  }

  return (
    <div
      ref={menuRef}
      className={`dark:bg-card-darkTheme bg-card-lightTheme fixed top-0 left-0 z-40 flex h-full w-48 transform flex-col gap-3 p-2 text-center shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex justify-between">
        <XCircleIcon
          className="w-8 cursor-pointer self-end"
          onClick={() => menuToggle()}
        />
        <ThemeButton />
      </div>
      <MenuItems
        className="font-semi-bold text-xl"
        handleNavigate={handleNavigate}
      />
    </div>
  )
}
