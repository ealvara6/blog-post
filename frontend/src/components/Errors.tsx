import React from 'react'

export const Error = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:text-error-darkTheme text-red-600">{children}</div>
  )
}
