import React from 'react'
import { Button } from './Button'
import clsx from 'clsx'
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'

type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: string
  pageInfo:
    | {
        currentPage: string
        total: string
        totalPage: string
      }
    | undefined
}

export const Pagination = ({
  currentPage,
  pageInfo,
  className,
}: PaginationProps) => {
  const updateQuery = useUpdateQueryParams()

  const handlePageClick = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    updateQuery({ page })
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
    const newPage =
      direction === 'forward'
        ? Number(currentPage) + 1
        : Number(currentPage) - 1
    window.scrollTo({ top: 0, behavior: 'smooth' })

    updateQuery({ page: newPage })
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
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-3',
        className,
      )}
    >
      <div className="self-center">
        showing page {pageInfo?.currentPage} out of {pageInfo?.totalPage}
      </div>
      <div className="flex gap-3">
        {currentPage !== '1' && <BackButton />}
        <PageNumbers />
        {Number(currentPage) !== Number(pageInfo?.totalPage) && (
          <ForwardButton />
        )}
      </div>
    </div>
  )
}
