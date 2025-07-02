import { Category } from '@/types/posts'

export const CategoriesList = ({ categories }: { categories: Category[] }) => {
  const categoryItems = categories.map((category, index) => {
    return (
      <div
        className={`dark:text-text-muted-darkTheme text-text-muted dark:border-border-darkTheme rounded-xl border px-2 font-thin ${index !== categories.length - 1 && 'border-r'}`}
        key={index}
      >
        {category.name}
      </div>
    )
  })

  return <div className="flex">{categoryItems}</div>
}
