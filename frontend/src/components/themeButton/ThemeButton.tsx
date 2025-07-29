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
          className="w-10 cursor-pointer sm:w-12"
        />
      ) : (
        <MoonIcon
          title="toggle theme"
          onClick={() => onClick()}
          className="w-10 cursor-pointer sm:w-12"
        />
      )}
    </>
  )
}

export default ThemeButton
