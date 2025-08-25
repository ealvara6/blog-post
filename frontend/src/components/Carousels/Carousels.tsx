import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { PostCarousel } from '@/components/Home/PostCarousel'
import { Error } from '@/components/Shared/Error'
import { useCategories } from '@/hooks/useCategories'
import { Link } from '../Shared/Link'
import { useNavigate } from 'react-router'

export const Carousels = () => {
  const { data, isError, error } = useCategories()
  const navigate = useNavigate()

  const GetCarousels = () => {
    const carousels = data?.map((category, index) => {
      return (
        <div className="flex flex-col gap-5 2xl:mx-30" key={index}>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-wider sm:text-3xl md:text-4xl">
              {category.name}
            </div>
            <Link
              className="dark:text-text-muted-darkTheme text-text-muted cursor-default text-lg tracking-wider"
              onClick={() => navigate(`/posts?categoryId=${category.id}`)}
            >
              View All
            </Link>
            {/* <div className="dark:text-text-muted-darkTheme text-text-muted dark:hover:text-accent-darkTheme hover:text-accent cursor-default text-lg tracking-wider underline underline-offset-4 transition duration-150">
              View All
            </div> */}
          </div>
          <PostCarousel category={category} index={index} />
        </div>
      )
    })

    if (isError) return <Error>{parseErrorMessage(error)}</Error>

    return (
      <div className="relative mx-auto flex max-w-[calc(100vw-20px)] flex-col gap-30 px-1 sm:px-20">
        {carousels}
      </div>
    )
  }

  return <GetCarousels />
}
