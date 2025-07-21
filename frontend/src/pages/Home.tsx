import { Carousels } from '@/components/Carousels'
import { Hero } from '@/components/Home/Hero'

const Home = () => {
  return (
    <div className="-mt-4 flex flex-col gap-15 sm:-mt-20">
      <Hero />
      <div className="max-w-screen">
        <Carousels />
      </div>
    </div>
  )
}

export default Home
