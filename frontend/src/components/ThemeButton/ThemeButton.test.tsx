import { render, screen, fireEvent } from '@testing-library/react'
import ThemeButton from './ThemeButton'
import * as useThemeModule from '@/context/ThemeProvider/useTheme'
import { vi, it, expect, describe, MockedFunction } from 'vitest'

vi.mock('../../context/ThemeProvider/useTheme.ts', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    dispatch: vi.fn(),
  })),
}))

describe('ThemeButton', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the button with correct label in light mode', async () => {
    const mockDispatch = vi.fn()
    const mockUseTheme = useThemeModule.useTheme as MockedFunction<
      typeof useThemeModule.useTheme
    >

    mockUseTheme.mockReturnValue({
      theme: 'light',
      dispatch: mockDispatch,
    })

    render(<ThemeButton />)

    const button = await screen.findByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Dark Mode')
  })

  it('calls dispatch with toggle action when clicked', () => {
    const mockDispatch = vi.fn()
    const mockUseTheme = useThemeModule.useTheme as MockedFunction<
      typeof useThemeModule.useTheme
    >

    mockUseTheme.mockReturnValue({
      theme: 'light',
      dispatch: mockDispatch,
    })

    render(<ThemeButton />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'toggle' })
  })
})
