import { useEffect, useReducer } from 'react'
import { Theme, themeReducer } from './themeReducer'
import { ThemeContext } from './ThemeContext'

const LOCAL_STORAGE_KEY = 'theme'

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storedTheme) return storedTheme as Theme

  return 'light'
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, dispatch] = useReducer(themeReducer, 'dark', getInitialTheme)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}
