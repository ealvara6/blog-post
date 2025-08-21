import headShot from '../assets/headShot.png'
import techStack from '@/data/techStack.json'

export const About = () => {
  return (
    <div className="mx-3 grid max-w-6xl grid-cols-1 tracking-wider sm:grid-cols-2 sm:gap-x-10">
      <h1 className="text-center text-2xl font-bold tracking-wider sm:col-span-full sm:text-3xl">
        About This Project
      </h1>
      <section className="dark:border-border-darkTheme border-border col-span-full mt-4 flex flex-col items-center gap-6 rounded-xl border p-5 sm:justify-center md:flex-row">
        <img
          src={headShot}
          alt="portrait of Eduardo Alvarado"
          className="aspect-square h-48 w-48 rounded-full object-cover sm:h-60 sm:w-60 md:h-72 md:w-72"
          loading="lazy"
          decoding="async"
        />

        <p className="max-w-prose text-center indent-4 text-base">
          Hey there! I'm Eduardo. I'm a web developer in training actively
          learning modern web development methods. I graduated from the C.T
          Bauer College of Business with a bachelor's degree in Management
          Information Systems from the University of Houston in 2020. I built
          this blog post app to practice full-stack web development and showcase
          my current skills.
        </p>
      </section>

      <section className="dark:border-border-darkTheme border-border mt-10 flex flex-col items-center gap-6 rounded-xl border p-5">
        <h2 className="text-xl font-semibold sm:text-2xl">What This Is</h2>
        <p className="max-w-prose text-center indent-4 text-base">
          This blog platform is not a production site. It is a personal project
          to demonstrate concepts like authentication, API design, database
          relationships, and UI design.
        </p>
      </section>

      <section className="dark:border-border-darkTheme border-border mt-10 flex flex-col items-center gap-6 rounded-xl border p-5">
        <h2 className="text-xl font-semibold sm:text-2xl">About Me</h2>
        <p className="max-w-prose text-center indent-4 text-base">
          During my free time, I enjoy going to the gym and spending time with
          my loved ones. I love learning new things and taking what I've learned
          from previous projects and implementing them into future ones. My goal
          is to transition into a full-stack web development position where I
          can continue to improve my skills and solve real world problems.
          Please feel free to reach out to me with any inquiries or questions
          you might have!
        </p>
      </section>

      <section className="dark:border-border-darkTheme border-border mt-10 flex flex-col items-center gap-6 rounded-xl border p-5 sm:col-span-full">
        <h2 className="text-xl font-semibold sm:text-2xl">Tech Stack</h2>
        <div className="grid w-full grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
          {techStack.map((tech) => {
            return (
              <a
                className="group dark:border-border-darkTheme border-border flex min-w-24 flex-col rounded border p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md"
                key={tech.name}
                href={tech.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-white dark:bg-white/5">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="h-12 w-12 object-contain group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-2 text-sm font-semibold">{tech.name}</div>
              </a>
            )
          })}
        </div>
      </section>

      <section className="dark:border-border-darkTheme border-border mt-10 flex flex-col items-center gap-6 rounded-xl border p-5 sm:col-span-full">
        <h2 className="text-xl font-semibold sm:text-2xl">Connect</h2>
        <div className="grid grid-cols-2 grid-rows-2 justify-items-center gap-y-5">
          <a
            href="https://github.com/ealvara6"
            rel="noopener noreferrer"
            target="_blank"
            className="dark:hover:text-accent-darkTheme hover:text-accent text-base font-medium underline sm:text-lg"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ealvara6/"
            rel="noopener noreferrer"
            target="_blank"
            className="dark:hover:text-accent-darkTheme hover:text-accent text-base font-medium underline sm:text-lg"
          >
            LinkedIn
          </a>
          <div className="col-span-full">
            <span className="font-bold">Email:</span>{' '}
            <a
              href="mailto:ealvara73@gmail.com"
              className="dark:hover:text-accent-darkTheme hover:text-accent underline"
            >
              Ealvara73@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
