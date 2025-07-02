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
        <div key={id}>
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
            className="peer-checked:dark:bg-accent-darkTheme peer-checked:bg-accent flex w-full cursor-pointer items-center justify-center rounded border border-gray-500 p-1 text-center transition select-none peer-checked:font-semibold peer-checked:text-white md:h-12 lg:w-36"
          >
            {category.name}
          </label>
        </div>
      )
    })
    buttonComponents?.push(
      <div className="flex items-center justify-center" key="clear">
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

    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:flex lg:justify-around">
        {buttonComponents}
      </div>
    )
  }

  if (!categories) return <p>Loading...</p>

  return <CategoryButtons />
}
