import { Button } from './Button'
import { useLocation, useNavigate } from 'react-router-dom'

interface PaginationProps {
  currentPage: string
  pageInfo:
    | {
        currentPage: string
        total: string
        totalPage: string
      }
    | undefined
}

export const Pagination = ({ currentPage, pageInfo }: PaginationProps) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const navigate = useNavigate()

  const handlePageClick = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    query.set('page', page.toString())
    navigate(`/posts?${query.toString()}`)
  }

  const PageNumbers = () => {
    const pages = []
    const limit = 10

    for (let i = 0; i < limit; i++) {
      if (Number(currentPage) - i > 0) {
        pages.push(Number(currentPage) - i)
      }
    }

    for (let i = 1; i < limit; i++) {
      if (Number(currentPage) + i <= Number(pageInfo?.totalPage)) {
        pages.push(Number(currentPage) + i)
      }
    }
    pages.sort((a, b) => a - b)

    return (
      <div className="flex justify-center gap-4">
        {pages.map((page) => {
          return (
            <div
              className={`w-14 cursor-pointer rounded border p-2 text-center select-none ${page === Number(currentPage) ? 'dark:bg-primary-dark' : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </div>
          )
        })}
      </div>
    )
  }

  const handleNavigationButton = (direction: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (direction === 'backward')
      query.set('page', (Number(currentPage) - 1).toString())
    navigate(`/posts?${query}`)
    if (direction === 'forward')
      query.set('page', (Number(currentPage) + 1).toString())
    navigate(`/posts?${query}`)
  }

  const BackButton = () => {
    return (
      <Button
        onClick={() => handleNavigationButton('backward')}
        variant="transparent"
        className="p-2 select-none"
      >
        {'<'}
      </Button>
    )
  }

  const ForwardButton = () => {
    return (
      <Button
        onClick={() => handleNavigationButton('forward')}
        variant="transparent"
        className="p-2 select-none"
      >
        {'>'}
      </Button>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3">
      {currentPage !== '1' && <BackButton />}
      <PageNumbers />
      {Number(currentPage) !== Number(pageInfo?.totalPage) && <ForwardButton />}
    </div>
  )
}
