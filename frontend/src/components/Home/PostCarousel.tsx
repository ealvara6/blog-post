import { Swiper, SwiperSlide } from 'swiper/react'
import { PostCard } from './PostCard'
import { Category, Post } from '@/types/posts'
import { useEffect, useState } from 'react'
import { useGetPosts } from '@/hooks/useGetPosts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { Pagination, Navigation } from 'swiper/modules'
import { Error } from '../Error'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export const PostCarousel = ({ category }: { category: Category }) => {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [serverErr, setServerErr] = useState<string | null>(null)
  const getPosts = useGetPosts()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts({ categoryId: String(category.id) })
        setPosts(posts.posts)
      } catch (err) {
        setServerErr(parseErrorMessage(err))
      }
    }

    fetchPosts()
  }, [getPosts, category.id])

  if (serverErr) return <Error>{serverErr}</Error>

  return (
    <div className="relative">
      <button
        className={`hidden sm:block swiper-button-prev-${category.id} dark:hover:text-accent-darkTheme hover:text-accent absolute top-1/2 -left-14 z-10 -translate-y-1/2`}
      >
        <ChevronLeftIcon className="w-10" />
      </button>
      <button
        className={`swiper-button-next-${category.id} dark:hover:text-accent-darkTheme hover:text-accent absolute top-1/2 -right-14 z-10 -translate-y-1/2`}
      >
        <ChevronRightIcon className="w-10" />
      </button>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.25 },
          768: { slidesPerView: 1.25 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1920: { slidesPerView: 3 },
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
        {posts
          ? posts.map((post, i) => (
              <SwiperSlide key={i}>
                <PostCard
                  title={post.title}
                  content={post.content}
                  id={post.id}
                />
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
