import * as ReactRouterDom from 'react-router-dom'
import { vi } from 'vitest'

export const mockNavigate = vi.fn()

export default {
  ...ReactRouterDom,
  useNavigate: () => mockNavigate,
}
