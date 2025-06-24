import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@/context/AuthProvider/AuthContext'
import { vi } from 'vitest'

export const customRender = (ui: React.ReactElement, options = {}) => {
  return render(
    <MemoryRouter>
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
    </MemoryRouter>,
    options,
  )
}
