import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'

export const Modal = ({
  onClose,
  children,
  className,
}: {
  onClose: () => void
  children: React.ReactNode
  className?: string
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 shadow-lg">
      <div
        className={clsx(
          'dark:bg-card-darkTheme bg-card dark:border-border-darkTheme border-border flex w-full max-w-xl flex-col items-center rounded border p-1 lg:max-w-3xl',
          className,
        )}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  )
}
