import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'danger'
  isActive?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const baseStyles = {
  primary: 'bg-primary-light dark:bg-primary-dark text-white',
  danger: 'bg-red-600 text-white',
}

export const Button = ({
  variant = 'primary',
  isActive = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        `mt-2 cursor-pointer rounded px-10 py-3 text-lg font-semibold text-white`,
        isActive ? 'bg-gray-600' : baseStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
