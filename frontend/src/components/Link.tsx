import clsx from 'clsx'
import React from 'react'

type LinkProps = {
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <a
      className={clsx(
        'after:bg-background-darkTheme dark:after:bg-background relative cursor-pointer pb-1 select-none after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
