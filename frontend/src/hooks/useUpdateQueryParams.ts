import { useLocation, useNavigate } from 'react-router-dom'

export const useUpdateQueryParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (filters: { categoryId?: string; page?: number; search?: string }) => {
    const params = new URLSearchParams(location.search)

    if (filters.categoryId !== undefined) {
      if (filters.categoryId === 'clear') {
        params.delete('categoryId')
      } else {
        params.set('categoryId', filters.categoryId)
      }
    }
    if (filters.page) params.set('page', String(filters.page))
    if (filters.search !== undefined) {
      if (filters.search.trim() === '') {
        params.delete('search')
      } else {
        params.set('search', filters.search)
      }
    }

    navigate(
      { pathname: '/posts', search: params.toString() },
      { replace: true },
    )
  }
}
