import { useTheme } from '../context/ThemeProvider/useTheme'

const ThemeButton = () => {
  const { dispatch } = useTheme()

  const onClick = () => {
    dispatch({ type: 'toggle' })
  }

  return (
    <button
      onClick={() => onClick()}
      className="bg-primary-light text-text-dark dark:bg-primary-dark cursor-pointer rounded-md p-1"
    >
      Change Theme
    </button>
  )
}

export default ThemeButton
