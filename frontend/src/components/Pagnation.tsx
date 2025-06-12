import React from 'react'
import { Button } from './Button'

interface PagnationProps {
  currentPage: string
  pageInfo:
    | {
        currentPage: string
        total: string
        totalPage: string
      }
    | undefined
  setPage: React.Dispatch<React.SetStateAction<string>>
}

export const Pagnation = ({
  currentPage,
  pageInfo,
  setPage,
}: PagnationProps) => {
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
              onClick={() => setPage(page.toString())}
            >
              {page}
            </div>
          )
        })}
      </div>
    )
  }
  const BackButton = () => {
    return (
      <Button
        onClick={() => setPage((Number(currentPage) - 1).toString())}
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
        onClick={() => setPage((Number(currentPage) + 1).toString())}
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
