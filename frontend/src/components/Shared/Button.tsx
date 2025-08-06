import React from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  children: React.ReactNode
  variant?: 'primary' | 'danger' | 'transparent' | 'dangerTransparent'
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const baseStyles = {
  primary:
    'bg-accent dark:bg-accent-darkTheme dark:hover:bg-accent-hover-darkTheme hover:bg-accent-hover dark:text-text ',
  transparent:
    'border text-text-primary dark:text-text-primary-darkTheme hover:text-text-primary-darkTheme border-border-darkTheme hover:bg-accent dark:hover:bg-accent-darkTheme  transition',
  danger:
    'dark:border-error-darkTheme border-error dark:text-text-primary-darkTheme text-text-primary  hover:text-text-primary-darkTheme dark:hover:bg-error-darkTheme hover:bg-error dark:focus:bg-error-darkTheme  border transition border',
  dangerTransparent:
    'dark:border-error-darkTheme border-error dark:text-text-primary-darkTheme text-text-primary  hover:text-text-primary-darkTheme dark:hover:bg-error-darkTheme hover:bg-error dark:focus:bg-error-darkTheme  border transition border',
}

export const Button = ({
  variant = 'primary',
  isActive = true,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        clsx(
          `min-h-12 min-w-24 rounded p-2 text-lg text-white`,
          !isActive
            ? 'cursor-default bg-gray-600'
            : `cursor-pointer ${baseStyles[variant]}`,
          className,
        ),
      )}
      {...props}
    >
      {children}
    </button>
  )
}
