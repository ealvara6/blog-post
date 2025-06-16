import { Category } from '@/types/posts'

export const CategoriesList = ({ categories }: { categories: Category[] }) => {
  const categoryItems = categories.map((category, index) => {
    return (
      <div
        className={`px-2 font-thin dark:text-gray-300 ${index !== categories.length - 1 && 'border-r'}`}
      >
        {category.name}
      </div>
    )
  })

  return <div className="flex">{categoryItems}</div>
}
