import React from 'react'
import { Link } from '../Shared/Link'
import { menuItems } from './menuItems'

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
