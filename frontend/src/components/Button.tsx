import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'danger' | 'transparent'
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const baseStyles = {
  primary: 'bg-primary-light dark:bg-primary-dark text-white',
  transparent: 'bg-transparent text-white border',
  danger: 'bg-red-600 text-white',
}

const sizeStyles = {
  sm: 'px-4 py-2',
  md: 'px-8 py-3',
  lg: 'px-16 py-4',
}

export const Button = ({
  variant = 'primary',
  size = 'sm',
  isActive = true,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        clsx(
          `rounded text-lg text-white`,
          !isActive
            ? 'cursor-default bg-gray-600'
            : `cursor-pointer ${baseStyles[variant]}`,
          sizeStyles[size],
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  )
}
