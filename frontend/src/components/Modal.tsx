import React, { useEffect, useRef } from 'react'

export const Modal = ({
  setIsOpen,
  children,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<string | null>>
  children: React.ReactNode
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(null)
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [setIsOpen])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 shadow-lg">
      <div
        className="dark:bg-card-darkTheme bg-card dark:border-border-darkTheme border-border flex w-full max-w-lg flex-col rounded border p-1"
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  )
}
