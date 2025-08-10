import { LikedComments } from '@/components/Comment/LikedComments'
import { LikedPosts } from '@/components/Posts/LikedPosts'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const options = [
  { id: 1, name: 'Liked Posts' },
  { id: 2, name: 'Liked Comments' },
]

export const History = () => {
  const [selectedOption, setSelectedOption] = useState(() => {
    const saved = localStorage.getItem('historyView')
    const id = saved || 'posts'
    return options.find((option) => option.id === Number(id)) ?? options[0]
  })

  useEffect(() => {
    localStorage.setItem('historyView', String(selectedOption.id))
  }, [selectedOption.id])

  return (
    <div className="flex w-full flex-col gap-5 px-3">
      <div className="text-2xl font-semibold tracking-wide sm:text-3xl">
        {selectedOption.name === 'Liked Posts'
          ? 'Liked Posts'
          : 'Liked Comments'}
      </div>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative min-w-42 sm:self-end">
          <ListboxButton
            className={
              'dark:border-border-darkTheme border-border relative flex w-full justify-between gap-2 rounded border p-2'
            }
          >
            {selectedOption.name}
            <ChevronDownIcon className="w-5" />
          </ListboxButton>
          <ListboxOptions
            modal={false}
            className={
              'bg-background dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme absolute z-10 flex w-full flex-col border-1 dark:bg-gray-700'
            }
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={
                  'cursor-pointer p-2 font-semibold tracking-wide select-none hover:bg-gray-600'
                }
              >
                {option.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {selectedOption.name === 'Liked Posts' ? (
        <LikedPosts />
      ) : (
        <LikedComments />
      )}
    </div>
  )
}
