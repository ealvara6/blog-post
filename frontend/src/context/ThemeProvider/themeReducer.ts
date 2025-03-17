export type Theme = 'light' | 'dark'

export type ThemeAction = { type: 'toggle' }

export const themeReducer = (theme: Theme, action: ThemeAction): Theme => {
  switch (action.type) {
    case 'toggle':
      return theme === 'light' ? 'dark' : 'light'
    default:
      throw new Error('Unknown action type')
  }
}
