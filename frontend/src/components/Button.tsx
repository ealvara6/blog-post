import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  isActive: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, isActive, ...props }: ButtonProps) => {
  return (
    <button
      className={`font-semibold; mt-2 cursor-pointer rounded p-1 text-lg text-white ${isActive ? 'bg-gray-500' : 'bg-primary-light dark:bg-primary-dark'}`}
      {...props}
    >
      {children}
    </button>
  )
}
