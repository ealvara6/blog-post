import React, { useState } from 'react'
import { Input } from '../Shared/Input'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

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
    <form className={clsx('flex p-2', className)} onSubmit={handleSubmit}>
      <Input
        className="dark:bg-card-darkTheme bg-card grow border-none text-xl focus:outline-none dark:text-white"
        placeholder="Search..."
        value={searchTerm}
        name="search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <MagnifyingGlassCircleIcon className="w-12 cursor-pointer" />
      </button>
    </form>
  )
}
