import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider/AuthProvider'

export const customRender = (ui: React.ReactElement, options = {}) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>,
    options,
  )
}
