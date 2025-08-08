import { LikedPosts } from '@/components/Posts/LikedPosts'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const options = [
  { id: 1, name: 'Liked Posts' },
  { id: 2, name: 'Liked Comments' },
]

export const History = () => {
  const [selectedOption, setSelectedOption] = useState(options[0])

  return (
    <div className="flex w-full flex-col gap-5 px-3">
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
            className={
              'dark:bg-card-darkTheme bg-background dark:text-text-primary-darkTheme text-text-primary dark:border-border-darkTheme absolute z-10 flex w-full flex-col border-1'
            }
          >
            {options.map((option) => (
              <ListboxOption
                key={option.id}
                value={option}
                className={
                  'cursor-pointer p-2 font-semibold tracking-wide select-none hover:bg-gray-700'
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
        'Liked Comments'
      )}
    </div>
  )
}
