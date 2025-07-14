import clsx from 'clsx'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const Header = ({ children }: { children: React.ReactNode }) => {
    return <div className="font-semibold tracking-wider">{children}</div>
  }

  const HeaderGroup = ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => {
    return (
      <div
        className={clsx(
          'flex flex-col items-center gap-2 sm:items-start',
          className,
        )}
      >
        {children}
      </div>
    )
  }

  const LinkGroup = ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => {
    return (
      <div
        className={clsx(
          'dark:text-text-muted-darkTheme text-text-muted flex min-w-26 flex-col items-center justify-center gap-2 font-thin sm:items-start sm:justify-start',
          className,
        )}
      >
        {children}
      </div>
    )
  }

  const Link = ({
    children,
    className,
  }: {
    children?: React.ReactNode
    className?: string
  }) => {
    return (
      <div className={clsx('cursor-pointer hover:underline', className)}>
        {children}
      </div>
    )
  }

  return (
    <footer className="border-border dark:border-border/5 min-h-24 border-t py-5">
      <div className="flex flex-col justify-center">
        <div className="grid grid-cols-2 grid-rows-2 justify-items-center gap-10 sm:flex sm:flex-row sm:justify-center sm:gap-28">
          <HeaderGroup>
            <Header>Navigation</Header>
            <LinkGroup>
              <Link>Home</Link>
              <Link>Posts</Link>
              <Link>About</Link>
            </LinkGroup>
          </HeaderGroup>

          <HeaderGroup>
            <Header>Social</Header>
            <LinkGroup className="flex flex-row gap-4 text-2xl">
              <a
                href="https://github.com"
                className="dark:hover:text-accent-darkTheme hover:text-accent"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                className="dark:hover:text-accent-darkTheme hover:text-accent"
              >
                <FaLinkedin />
              </a>
            </LinkGroup>
          </HeaderGroup>

          <HeaderGroup className="col-span-full">
            <Header>Legal</Header>
            <LinkGroup>
              <Link>Privacy Policy</Link>
              <Link>Terms of Service</Link>
            </LinkGroup>
          </HeaderGroup>
        </div>
      </div>
    </footer>
  )
}

export default Footer
