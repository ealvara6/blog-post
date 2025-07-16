import { useNavigate } from 'react-router-dom'
import { MenuItems } from './MenuItems'
import ThemeButton from '../ThemeButton/ThemeButton'

export const Menu = () => {
  const navigate = useNavigate()

  const handleNavigate = (link: string) => {
    navigate({ pathname: link })
  }

  return (
    <div className="flex gap-10">
      <ThemeButton />
      <MenuItems handleNavigate={handleNavigate} className="self-center" />
    </div>
  )
}
