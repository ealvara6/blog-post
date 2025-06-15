import React, { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'

type SearchBarProps = React.HTMLAttributes<HTMLFormElement>

export const SearchBar = ({ className }: SearchBarProps) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const [searchTerm, setSearchTerm] = useState(query.get('search') || '')
  const updateQuery = useUpdateQueryParams()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateQuery({ search: searchTerm.trim(), page: 1 })
  }

  return (
    <form
      className={clsx('flex rounded border p-2', className)}
      onSubmit={handleSubmit}
    >
      <Input
        className="dark:bg-background-dark grow border-none text-xl focus:border-none focus:outline-none dark:text-white"
        placeholder="Search..."
        value={searchTerm}
        name="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        className="hover:bg-primary-dark w-fit transition"
        variant="transparent"
      >
        Search
      </Button>
    </form>
  )
}
