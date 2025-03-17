import React, { createContext } from 'react'
import { Theme, ThemeAction } from './themeReducer'

export const ThemeContext = createContext<{
  theme: Theme
  dispatch: React.Dispatch<ThemeAction>
} | null>(null)
