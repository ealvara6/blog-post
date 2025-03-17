import ThemeButton from './ThemeButton'

const Navbar = () => {
  return (
    <nav className="border-border-dark flex border border-solid p-2">
      <div className="grow">This is the navbar.</div>
      <ThemeButton />
    </nav>
  )
}

export default Navbar
