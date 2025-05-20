import { useAuth } from '@/context/AuthProvider/useAuth'
import { useState } from 'react'
import { Modal } from '../Modal'
import { UserNameModal } from './Modals/UsernameModal'
import { EmailModal } from './Modals/EmailModal'
import { PasswordModal } from './Modals/PasswordModal'
import { DeleteAccountModal } from './Modals/DeleteAccountModal'

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
          className={`flex min-h-16 w-full cursor-pointer rounded border border-gray-500 p-2 ${tab.label === 'Delete Account' ? 'bg-red-700' : ''}`}
          onClick={() => handleClick(tab.name)}
          key={index}
        >
          <div className="flex grow flex-col">
            <div className="flex grow items-center font-bold">{tab.label}</div>
            {tab.subtext ? (
              <div className="text-gray-400">{tab.subtext}</div>
            ) : (
              ''
            )}
          </div>
          <div className="self-center">---&gt;</div>
        </div>
      )
    })

    return tabs
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <Tabs />
      {isOpen && (
        <Modal setIsOpen={setIsOpen}>
          {tabInfo.find((tab) => tab.name === isOpen)?.component}
        </Modal>
      )}
    </div>
  )
}
