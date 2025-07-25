import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams'
import { useLocation } from 'react-router-dom'
import { useCategories } from '@/hooks/useCategories'

export const Filter = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const updateQuery = useUpdateQueryParams()
  const selectedCategory = query.get('categoryId') || ''

  const { data, isLoading } = useCategories()

  const handleChange = (categoryId: string) => {
    updateQuery({ categoryId: categoryId, page: 1 })
  }

  const SkeletonCard = () => {
    const skeleton = [...Array(5)].map((_, i) => {
      return (
        <div className="h-12 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700" />
      )
    })

    return skeleton
  }

  const CategoryButtons = () => {
    const buttonComponents = data?.map((category) => {
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
            className="peer-checked:dark:bg-accent-darkTheme peer-checked:bg-accent flex h-12 w-full cursor-pointer items-center justify-center rounded border border-gray-500 p-1 text-center transition select-none peer-checked:font-semibold peer-checked:text-white lg:h-15 lg:w-46 xl:w-64"
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
      <div className="grid grid-cols-2 grid-rows-2 gap-2 lg:flex lg:justify-around lg:text-xl">
        {isLoading ? <SkeletonCard /> : buttonComponents}
      </div>
    )
  }

  return <CategoryButtons />
}
