import clsx from 'clsx'
import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

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
    <footer className="dark:border-border-darkTheme min-h-24 border-t py-5">
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

    // <footer className="border-t border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
    //   <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
    //     {/* Logo & Description */}
    //     <div>
    //       <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
    //         Draftory
    //       </h2>
    //       <p className="mt-2 text-sm">
    //         Sharing insights, code, and stories for developers and creators.
    //       </p>
    //     </div>

    //     {/* Navigation */}
    //     <div>
    //       <h3 className="text-sm font-semibold tracking-wider uppercase">
    //         Navigation
    //       </h3>
    //       <ul className="mt-4 space-y-2 text-sm">
    //         <li>
    //           <a href="/" className="hover:underline">
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/blog" className="hover:underline">
    //             Blog
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/about" className="hover:underline">
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/contact" className="hover:underline">
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>

    //     {/* Social */}
    //     <div>
    //       <h3 className="text-sm font-semibold tracking-wider uppercase">
    //         Connect
    //       </h3>
    //       <div className="mt-4 flex space-x-4 text-xl">
    //         <a
    //           href="https://github.com"
    //           aria-label="GitHub"
    //           className="hover:text-accent"
    //         >
    //           <FaGithub />
    //         </a>
    //         <a
    //           href="https://twitter.com"
    //           aria-label="Twitter"
    //           className="hover:text-accent"
    //         >
    //           <FaTwitter />
    //         </a>
    //         <a
    //           href="https://linkedin.com"
    //           aria-label="LinkedIn"
    //           className="hover:text-accent"
    //         >
    //           <FaLinkedin />
    //         </a>
    //       </div>
    //     </div>

    //     {/* Legal */}
    //     <div>
    //       <h3 className="text-sm font-semibold tracking-wider uppercase">
    //         Legal
    //       </h3>
    //       <ul className="mt-4 space-y-2 text-sm">
    //         <li>
    //           <a href="/privacy" className="hover:underline">
    //             Privacy Policy
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/terms" className="hover:underline">
    //             Terms of Service
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>

    //   {/* Bottom Bar */}
    //   <div className="mt-10 border-t border-gray-200 py-4 text-center text-xs text-gray-500 dark:border-gray-700">
    //     © {new Date().getFullYear()} Draftory. All rights reserved.
    //   </div>
    // </footer>
  )
}

export default Footer
