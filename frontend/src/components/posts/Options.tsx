import { Category } from '@/types/posts'
import clsx from 'clsx'
import React from 'react'
import { Input } from '../shared/Input'

type OptionProps = {
  options: Category[] | undefined
  selected: number[]
  onChange: (selected: number[]) => void
} & React.ButtonHTMLAttributes<HTMLDivElement>

export const Options = ({
  options,
  className,
  selected,
  onChange,
}: OptionProps) => {
  const toggle = (id: number) => {
    const newSelected = selected.includes(id)
      ? selected.filter((i) => i !== id)
      : [...selected, id]

    onChange(newSelected)
  }

  const OptionItems = () => {
    if (!options) return
    return options.map((category) => {
      const id = category.id.toString()

      return (
        <div key={id} className="flex h-14 w-full justify-center text-center">
          <Input
            type="checkbox"
            checked={selected.includes(category.id)}
            onChange={() => toggle(category.id)}
            id={id}
            className="peer hidden"
            value={category.id}
          />
          <label
            htmlFor={id}
            className={clsx(
              'dark:border-border-darkTheme border-border peer-checked:dark:bg-accent-darkTheme peer-checked:bg-accent flex w-full max-w-2xl cursor-pointer items-center justify-center rounded border p-1 font-semibold transition select-none peer-checked:font-semibold peer-checked:text-white',
              className,
            )}
          >
            {category.name}
          </label>
        </div>
      )
    })
  }

  return <OptionItems />
}
