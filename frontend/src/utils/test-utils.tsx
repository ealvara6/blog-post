import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@/context/AuthProvider/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'

export const customRender = (ui: React.ReactElement, { route = '/' } = {}) => {
  const qc = new QueryClient()
  window.history.pushState({}, 'Test page', route)

  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={[route]}>
        <AuthContext.Provider
          value={{
            authUser: {
              id: 1,
              username: 'mock_username',
              email: 'mock@gmail.com',
            },
            setAuthUser: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            signup: vi.fn(),
          }}
        >
          {ui}
        </AuthContext.Provider>
      </MemoryRouter>
      ,
    </QueryClientProvider>,
  )
}
