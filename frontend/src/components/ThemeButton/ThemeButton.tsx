import { useTheme } from '../../context/ThemeProvider/useTheme'

const ThemeButton = () => {
  const { theme, dispatch } = useTheme()

  const onClick = () => {
    dispatch({ type: 'toggle' })
  }

  return (
    <button
      onClick={() => onClick()}
      className="bg-primary-light text-text-dark dark:bg-primary-dark p1 cursor-pointer rounded-md p-2"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeButton
