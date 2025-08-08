import { Carousels } from '@/components/Carousels/Carousels'
import { Hero } from '@/components/Home/Hero'
import { useAuth } from '@/context/AuthProvider/useAuth'

const Home = () => {
  const { authUser } = useAuth()
  return (
    <div
      className={`-mt-4 flex flex-col gap-15 ${authUser ? 'mt-10 mb-10' : 'sm:-mt-20'}`}
    >
      {!authUser && <Hero />}
      <div className="max-w-screen">
        <Carousels />
      </div>
    </div>
  )
}

export default Home
