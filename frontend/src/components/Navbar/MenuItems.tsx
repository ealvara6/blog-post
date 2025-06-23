import React from 'react'
import { Link } from '../Link'

const menuItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Posts',
    link: '/posts',
  },
  {
    name: 'About',
    link: '/about',
  },
]

type MenuItemsProps = {
  handleNavigate: (link: string) => void
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const MenuItems = ({ handleNavigate, ...props }: MenuItemsProps) => {
  const items = menuItems.map((item, index) => (
    <Link key={index} onClick={() => handleNavigate(item.link)} {...props}>
      {item.name}
    </Link>
  ))

  return items
}
