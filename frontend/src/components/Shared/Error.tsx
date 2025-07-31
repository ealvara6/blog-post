import { ReactNode } from 'react'

export const Error = ({ children }: { children: ReactNode }) => {
  return (
    <p className="dark:text-error-darkTheme text-error lg:text-xl">
      {children}
    </p>
  )
}
