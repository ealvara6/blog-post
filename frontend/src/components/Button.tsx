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
  primary:
    'bg-accent dark:bg-accent-darkTheme dark:hover:bg-accent-hover-darkTheme hover:bg-accent-hover dark:text-text',
  transparent:
    'dark:border-accent-darkTheme border-accent border text-text-primary dark:text-text-primary-darkTheme hover:text-text-primary-darkTheme border-border hover:bg-accent dark:hover:bg-accent-darkTheme h-13 w-26 transition',
  danger:
    'dark:border-error-darkTheme border-error dark:text-text-primary-darkTheme text-text-primary hover:text-text-primary-darkTheme dark:hover:bg-error-darkTheme hover:bg-error dark:focus:bg-error-darkTheme h-13 w-26 border transition border',
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
