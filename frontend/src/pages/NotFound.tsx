import { Button } from '@/components/Shared/Button'
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col">
      <img
        src="/404.png"
        alt="404 image"
        className="h-fit max-h-[600px] w-auto"
      />
      <Button
        variant="transparent"
        className="dark:border-accent-darkTheme border-accent w-3/4 self-center"
        onClick={() => navigate('/')}
      >
        Return Home
      </Button>
    </section>
  )
}

export default NotFound
