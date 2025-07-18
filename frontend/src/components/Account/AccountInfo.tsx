import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import { Modal } from '../Modal'
import { UserNameModal } from './Modals/UsernameModal'
import { EmailModal } from './Modals/EmailModal'
import { PasswordModal } from './Modals/PasswordModal'
import { DeleteAccountModal } from './Modals/DeleteAccountModal'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export const AccountInfo = () => {
  const { authUser } = useAuth()
  const [isOpen, setIsOpen] = useState<'username' | 'email' | null | string>(
    null,
  )

  const tabInfo = [
    {
      name: 'username',
      label: 'Change Username',
      subtext: authUser?.username,
      component: <UserNameModal setIsOpen={setIsOpen} />,
    },
    {
      name: 'email',
      label: 'Change Email',
      subtext: authUser?.email,
      component: <EmailModal setIsOpen={setIsOpen} />,
    },
    {
      name: 'password',
      label: 'Change Password',
      component: <PasswordModal setIsOpen={setIsOpen} />,
    },
    {
      name: 'delete',
      label: 'Delete Account',
      component: <DeleteAccountModal setIsOpen={setIsOpen} />,
    },
  ]

  const handleClick = (name: string) => {
    setIsOpen(name)
  }

  const Tabs = () => {
    const tabs = tabInfo.map((tab, index) => {
      return (
        <div
          className={`dark:border-border-darkTheme flex h-20 min-h-16 w-full cursor-pointer rounded border p-2 sm:text-lg ${tab.label === 'Delete Account' ? 'dark:bg-error-darkTheme bg-error text-text-primary-darkTheme' : ''}`}
          onClick={() => handleClick(tab.name)}
          key={index}
        >
          <div className="flex grow flex-col justify-center">
            <div className="flex font-bold sm:text-lg">{tab.label}</div>
            {tab.subtext ? (
              <div className="dark:text-text-muted-darkTheme text-text-muted">
                {tab.subtext}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="self-center">
            <ChevronRightIcon className="w-8" />
          </div>
        </div>
      )
    })

    return tabs
  }

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-8">
      <Tabs />
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {tabInfo.find((tab) => tab.name === isOpen)?.component}
        </Modal>
      )}
    </div>
  )
}
