import { Button } from '@/components/Shared/Button'
import { useCategories } from '@/hooks/useCategories'
import { Category } from '@/types/posts'
import { useNavigate } from 'react-router-dom'

export const Browse = () => {
  const { data: categories, isError, error } = useCategories()
  const navigate = useNavigate()

  const CategoryItems = () => {
    const categoryItems = categories?.map((category: Category) => {
      return (
        <Button
          variant="transparent"
          className="dark:border-border-darkTheme h-20 w-full max-w-96"
          key={category.id}
          onClick={() => navigate(`/posts?categoryId=${category.id}`)}
        >
          {category.name}
        </Button>
      )
    })

    categoryItems?.push(
      <Button
        variant="transparent"
        className="dark:border-border-darkTheme h-20 w-full max-w-96"
        key={'all'}
        onClick={() => navigate('/posts')}
      >
        All
      </Button>,
    )

    return (
      <div className="grid grid-cols-1 justify-items-center gap-x-3 gap-y-7 md:grid-cols-2">
        {categoryItems}
      </div>
    )
  }

  if (isError) return <div>{error.message}</div>

  return (
    <div className="flex w-full max-w-5xl flex-col gap-14 px-3 md:py-36">
      <div className="text-center text-3xl font-semibold tracking-wide">
        Browse
      </div>

      <CategoryItems />
    </div>
  )
}
