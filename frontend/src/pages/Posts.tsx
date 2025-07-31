import { Filter } from '@/components/Posts/Filter'
import { GetPosts } from '@/components/Posts/GetPosts'
import { Pagination } from '@/components/Shared/Pagination'
import { PostCardSkeleton } from '@/components/Posts/PostCardSkeleton'
import { SearchBar } from '@/components/Posts/SearchBar'
import { usePosts } from '@/hooks/usePosts'

import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const Posts = () => {
  const location = useLocation()
  const queryData = useMemo(() => {
    const query = new URLSearchParams(location.search)
    return {
      page: query.get('page') || '1',
      search: query.get('search') || '',
      categoryId: query.get('categoryId') || '',
    }
  }, [location.search])

  const { data, isLoading, isFetching } = usePosts(queryData)

  if (!data) return

  const pageInfo = {
    currentPage: String(data.pageInfo.currentPage),
    total: String(data.pageInfo.total),
    totalPage: String(data.pageInfo.totalPage),
  }

  const PageSection = () => {
    return (
      <>
        {isLoading ? (
          [...Array(5)].map((_, i) => <PostCardSkeleton key={i} />)
        ) : (
          <GetPosts posts={data.posts} isFetching={isFetching} />
        )}
        <div className="block sm:hidden">
          <Pagination
            className="col-span-full"
            currentPage={queryData.page}
            pageInfo={pageInfo}
            limit={3}
          />
        </div>
        <div className="hidden w-full sm:block">
          <Pagination
            className="col-span-full"
            currentPage={queryData.page}
            pageInfo={pageInfo}
            limit={5}
          />
        </div>
      </>
    )
  }

  return (
    <>
      {data.posts ? (
        <div className="mx-3 flex w-full flex-col gap-15 sm:max-w-7xl">
          <SearchBar className="dark:border-border-darkTheme border-border dark:bg-card-darkTheme bg-card col-span-full border focus:outline" />
          <Filter />
          {data.posts.length !== 0 ? (
            <PageSection />
          ) : (
            <p className="self-center text-2xl font-bold">No posts found</p>
          )}
        </div>
      ) : (
        <div>No posts found</div>
      )}
    </>
  )
}
