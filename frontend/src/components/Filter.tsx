import { useGetCategories } from '@/hooks/useGetCategories'
import { Category } from '@/types/posts'
import { useEffect, useState } from 'react'
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'
import { useLocation } from 'react-router-dom'

export const Filter = () => {
  const getCategories = useGetCategories()
  const [categories, setCategories] = useState<Category[]>()
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const updateQuery = useUpdateQueryParams()
  const selectedCategory = query.get('categoryId') || ''

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }

    fetchCategories()
  }, [getCategories, selectedCategory])

  const handleChange = (categoryId: string) => {
    updateQuery({ categoryId: categoryId, page: 1 })
  }

  const CategoryButtons = () => {
    const buttonComponents = categories?.map((category) => {
      const id = category.id.toString()
      return (
        <div className="flex items-center gap-2" key={id}>
          <input
            type="radio"
            name="category"
            className={`peer hidden`}
            checked={selectedCategory === id}
            value={category.id}
            id={id}
            onChange={() => handleChange(category.id.toString())}
          />
          <label
            htmlFor={id}
            className="cursor-pointer rounded border border-gray-500 p-1 text-center transition select-none peer-checked:bg-blue-600 peer-checked:font-semibold peer-checked:text-white"
          >
            {category.name}
          </label>
        </div>
      )
    })
    buttonComponents?.push(
      <div className="flex items-center gap-2" key="clear">
        <input
          type="radio"
          name="category"
          className={`peer hidden`}
          value="clear"
          id="clear"
          onChange={() => handleChange('clear')}
        />
        <label htmlFor="clear" className="cursor-pointer border-b">
          Clear
        </label>
      </div>,
    )

    return <div className="flex justify-around">{buttonComponents}</div>
  }

  if (!categories) return <p>Loading...</p>

  return (
    <form className="gap-3">
      <CategoryButtons />
    </form>
  )
}
