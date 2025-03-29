import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { ThemeProvider } from '@/context/ThemeProvider/ThemeProvider'
import ThemeButton from './ThemeButton'
import '@testing-library/jest-dom'

describe('ThemeButton Integration', () => {
  it('integration test with actual ThemeProvider', () => {
    vi.resetModules()
    vi.doUnmock('../context/ThemeProvider/useTheme.ts')

    render(
      <ThemeProvider>
        <ThemeButton />
      </ThemeProvider>,
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()

    expect(button).toHaveTextContent('Dark Mode')

    fireEvent.click(button)

    expect(button).toHaveTextContent('Light Mode')
  })
})
