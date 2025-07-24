import { Swiper, SwiperSlide } from 'swiper/react'
import { PostCard } from './PostCard'
import { Category } from '@/types/posts'
import { useMemo } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { usePostsByCategory } from '@/hooks/usePostsByCategory'

export const PostCarousel = ({
  category,
  index,
}: {
  category: Category
  index: number
}) => {
  const { data, isLoading } = usePostsByCategory(String(category.id))

  const delay = useMemo(() => {
    return 3000 + index * 750
  }, [index])

  return (
    <div className="relative">
      <button
        className={`hidden sm:block swiper-button-prev-${category.id} dark:hover:text-accent-darkTheme hover:text-accent absolute top-1/2 -left-14 z-10 -translate-y-1/2`}
      >
        <ChevronLeftIcon className="w-10" />
      </button>
      <button
        className={`hidden sm:block swiper-button-next-${category.id} dark:hover:text-accent-darkTheme hover:text-accent absolute top-1/2 -right-14 z-10 -translate-y-1/2`}
      >
        <ChevronRightIcon className="w-10" />
      </button>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.25 },
          768: { slidesPerView: 1.25 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1920: { slidesPerView: 3 },
        }}
        autoplay={{
          delay,
          disableOnInteraction: true,
        }}
        pagination={{
          el: `.swiper-pagination-${category.id}`,
          clickable: true,
        }}
        navigation={{
          nextEl: `.swiper-button-next-${category.id}`,
          prevEl: `.swiper-button-prev-${category.id}`,
        }}
        className="mb-10"
      >
        {data
          ? data?.map((post, i) => (
              <SwiperSlide key={i}>
                {isLoading ? (
                  'Loading...'
                ) : (
                  <PostCard
                    title={post.title}
                    content={post.content}
                    id={post.id}
                    comments={post.comments}
                  />
                )}
              </SwiperSlide>
            ))
          : 'Loading...'}
      </Swiper>
      <div
        className={`swiper-pagination-${category.id} mt-4 flex justify-center`}
      />
    </div>
  )
}
