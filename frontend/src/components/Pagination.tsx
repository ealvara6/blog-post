import React from 'react'
import clsx from 'clsx'
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline'

type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  currentPage: string
  pageInfo:
    | {
        currentPage: string
        total: string
        totalPage: string
      }
    | undefined
  limit: number
}

export const Pagination = ({
  currentPage,
  pageInfo,
  className,
  limit,
}: PaginationProps) => {
  const updateQuery = useUpdateQueryParams()

  const handlePageClick = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    updateQuery({ page })
  }

  const PageNumbers = () => {
    const pages = []
    const totalPages = Number(pageInfo?.totalPage)
    const current = Number(currentPage)
    const half = Math.floor(limit / 2)

    let start = current - half
    let end = current + half

    if (start < 1) {
      end += 1 - start
      start = 1
    }
    if (end > totalPages) {
      start -= end - totalPages
      end = totalPages
    }

    start = Math.max(start, 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return (
      <div className="flex justify-center gap-4">
        {pages.map((page, index) => {
          return (
            <div
              className={`flex h-12 w-14 cursor-pointer items-center justify-center self-center rounded border select-none sm:h-16 sm:w-20 ${page === Number(currentPage) ? 'dark:bg-accent-darkTheme bg-accent' : ''}`}
              onClick={() => handlePageClick(page)}
              key={index}
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
      <button
        onClick={() => handleNavigationButton('backward')}
        className="cursor-pointer select-none"
      >
        <ArrowLeftCircleIcon className="dark:hover:text-accent-darkTheme hover:text-accent w-10 sm:w-14" />
      </button>
    )
  }

  const ForwardButton = () => {
    return (
      <button
        onClick={() => handleNavigationButton('forward')}
        className="cursor-pointer select-none"
      >
        <ArrowRightCircleIcon className="dark:hover:text-accent-darkTheme hover:text-accent w-10 sm:w-14" />
      </button>
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
