import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }: InputProps, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={twMerge(
        clsx(
          'dark:text-text-light rounded border p-2 dark:bg-gray-300',
          className,
          props.disabled ? 'bg-gray-600' : '',
        ),
      )}
    ></input>
  )
})
