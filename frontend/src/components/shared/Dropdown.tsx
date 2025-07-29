import { Category } from '@/types/posts'

export const Dropdown = ({
  values,
  label,
}: {
  values: Category[] | undefined
  label: string
}) => {
  const Options = () => {
    if (!values) return
    return values.map((value) => {
      const idString = value.id.toString()
      return <option id={idString}>{value.name}</option>
    })
  }

  return (
    <select
      name={label}
      id={label}
      className="dark:bg-background-dark rounded border p-1"
    >
      <Options />
    </select>
  )
}
