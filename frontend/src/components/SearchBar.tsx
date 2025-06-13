import React, { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'
import { useLocation, useNavigate } from 'react-router-dom'

export const SearchBar = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState(query.get('search') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    query.set('search', searchTerm)
    query.set('page', '1')

    navigate(`/posts?${query.toString()}`)
  }

  return (
    <form className="flex rounded border p-2" onSubmit={handleSubmit}>
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
