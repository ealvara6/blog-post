import { useGetCategories } from '@/hooks/useGetCategories'
import { Category } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useEffect, useState } from 'react'
import { PostCarousel } from '@/components/Home/PostCarousel'
import { Error } from '@/components/Shared/Error'

export const Carousels = () => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [serverErr, setServerErr] = useState<string | null>(null)
  const getCategories = useGetCategories()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
      } catch (err) {
        setServerErr(parseErrorMessage(err))
      }
    }

    fetchCategories()
  }, [getCategories])

  const GetCarousels = () => {
    const carousels = categories?.map((category, index) => {
      return (
        <div className="flex flex-col 2xl:mx-30" key={index}>
          <div className="mb-5 text-3xl font-bold tracking-wider">
            {category.name}
          </div>
          <PostCarousel category={category} index={index} />
        </div>
      )
    })

    if (serverErr) return <Error>{serverErr}</Error>

    return (
      <div className="relative mx-auto flex max-w-[calc(100vw-20px)] flex-col gap-52 px-1 sm:px-20">
        {carousels}
      </div>
    )
  }

  return <GetCarousels />
}
