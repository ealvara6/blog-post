import { Category } from '@/types/posts'

export const CategoriesList = ({ categories }: { categories: Category[] }) => {
  const categoryItems = categories.map((category, index) => {
    return (
      <div
<<<<<<< HEAD
        className={`dark:text-text-muted-darkTheme text-text-muted dark:border-border-darkTheme rounded-xl border px-2 font-thin ${index !== categories.length - 1 && 'border-r'}`}
=======
        className={`dark:text-text-muted-darkTheme text-text-muted px-2 font-thin ${index !== categories.length - 1 && 'border-r'}`}
>>>>>>> ed0b5df780ab651d01ce7698664eb475c4e7737c
      >
        {category.name}
      </div>
    )
  })

  return <div className="flex">{categoryItems}</div>
}
