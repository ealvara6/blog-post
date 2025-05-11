import clsx from 'clsx'
import React, { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }: InputProps, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={clsx(
        'rounded border p-2',
        className,
        props.disabled ? 'bg-gray-600' : '',
      )}
    ></input>
  )
})
