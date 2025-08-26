import { useAuth } from '@/context/AuthProvider/useAuth'
import { useLoginModal } from '@/context/LoginModalProvider/LoginModalContext'
import {
  usePostLikes,
  useTogglePostLike,
  useUserLikedPost,
} from '@/hooks/useLikes'
import { HeartIcon } from '@heroicons/react/24/solid'

export const Hearts = ({ id }: { id: number }) => {
  const { authUser } = useAuth()
  const { openLoginModal } = useLoginModal()
  const { data: likeData, isLoading: isLoadingLikes } = usePostLikes(id)
  const { data: likedData, isLoading } = useUserLikedPost(id)
  const { mutate: toggleLike } = useTogglePostLike(id, likedData?.liked)

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!authUser) {
      openLoginModal()
      return
    }
    toggleLike()
  }
  return (
    <div className="flex items-center gap-2 select-none">
      <HeartIcon
        className={`h-6 ${likedData?.liked && 'dark:text-error-darkTheme text-error'}`}
        onClick={(e) => handleHeartClick(e)}
      />
      {isLoadingLikes ? '0' : likeData.likeCount}
    </div>
  )
}
