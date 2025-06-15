import { Filter } from '@/components/Filter'
import { GetPosts } from '@/components/GetPosts'
import { Pagination } from '@/components/Pagination'
import { SearchBar } from '@/components/SearchBar'
import { useGetPosts } from '@/hooks/useGetPosts'
import { Post } from '@/types/posts'
import { parseErrorMessage } from '@/utils/parseErrorMessage'
import { useEffect, useMemo, useState } from 'react'
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

  const [posts, setPosts] = useState<Post[]>()
  const [pageInfo, setPageInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const getPosts = useGetPosts()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts(queryData)
        setPosts(response.posts)
        setPageInfo(response.pageInfo)
      } catch (err) {
        setError(parseErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [getPosts, queryData])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!posts) return

  const PageSection = () => {
    return (
      <>
        <GetPosts posts={posts} pageInfo={pageInfo} />
        <Pagination
          className="col-span-full"
          currentPage={queryData.page}
          pageInfo={pageInfo}
        />
      </>
    )
  }

  return (
    <>
      {posts ? (
        <div className="flex w-full flex-col gap-5">
          <SearchBar className="col-span-full" />
          <Filter />
          {posts.length !== 0 ? (
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
