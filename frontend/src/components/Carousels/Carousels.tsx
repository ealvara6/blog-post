import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { PostCarousel } from '@/components/Home/PostCarousel'
import { Error } from '@/components/Shared/Error'
import { useCategories } from '@/hooks/useCategories'

export const Carousels = () => {
  const { data, isError, error } = useCategories()

  const GetCarousels = () => {
    const carousels = data?.map((category, index) => {
      return (
        <div className="flex flex-col 2xl:mx-30" key={index}>
          <div className="mb-5 text-2xl font-bold tracking-wider sm:text-3xl md:text-4xl">
            {category.name}
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
