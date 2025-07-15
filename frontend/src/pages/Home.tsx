import { Carousels } from '@/components/Carousels'
import { Hero } from '@/components/Home/Hero'

const Home = () => {
  return (
    <div className="-mt-8 flex flex-col gap-15 sm:-mt-20">
      <Hero />
      <div className="mx-auto max-w-screen px-4">
        <Carousels />
      </div>
    </div>
  )
}

export default Home
