import clsx from 'clsx'
import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={clsx(
        'rounded border',
        className,
        props.disabled ? 'bg-gray-600' : '',
      )}
    ></input>
  )
}
