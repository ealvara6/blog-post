import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Shared/Button'

export const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="text-text-primary-darkTheme relative mx-[calc(50%-50vw)] my-18 w-screen select-none sm:-my-8">
      <img
        src="/hero-1920.jpg"
        alt="Hero"
        srcSet="/hero-768.jpg 768w, /hero-1280.jpg 1280w, /hero-1920.jpg 1920w, /hero-2560.jpg 2560w"
        sizes="100vw"
        className="h-screen w-screen object-cover"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/20" />
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <div className="z-20 flex flex-col items-center gap-6 rounded-xl border border-white/20 bg-white/10 px-8 py-12 text-center shadow-lg backdrop-blur-md sm:px-8">
          <h1 className="text-5xl leading-tight font-extrabold tracking-tighter md:text-7xl">
            Welcome to the forum
          </h1>
          <p className="max-w-2xl text-lg text-white/80 md:text-xl">
            Ask questions, explore topics, and grow with the community.
          </p>
          <div className="flex gap-10">
            <Button
              variant="transparent"
              className="text-text-primary-darkTheme border-accent dark:border-accent-darkTheme sm:w-36"
              onClick={() => navigate('/browse')}
            >
              Browse
            </Button>
            <Button
              variant="transparent"
              className="text-text-primary-darkTheme border-accent dark:border-accent-darkTheme sm:w-36"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
