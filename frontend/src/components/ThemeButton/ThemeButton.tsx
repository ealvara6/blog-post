import { useTheme } from '@/context/ThemeProvider/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeButton = () => {
  const { theme, dispatch } = useTheme()

  const onClick = () => {
    dispatch({ type: 'toggle' })
  }

  return (
    <>
      {theme === 'dark' ? (
        <SunIcon
          title="toggle theme"
          onClick={() => onClick()}
          className="w-8 cursor-pointer"
        />
      ) : (
        <MoonIcon
          title="toggle theme"
          onClick={() => onClick()}
          className="w-8 cursor-pointer"
        />
      )}
    </>
  )
}

export default ThemeButton
