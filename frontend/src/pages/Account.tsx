import { AccountComments } from '@/components/Account/AccountComments'
import { AccountInfo } from '@/components/Account/AccountInfo'
import { AccountPosts } from '@/components/Account/AccountPosts'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const tabs = [
  {
    label: 'Account Information',
    value: 'account information',
    component: <AccountInfo />,
  },
  {
    label: 'User Posts',
    value: 'user posts',
    component: <AccountPosts />,
  },
  {
    label: 'User Comments',
    value: 'user comments',
    component: <AccountComments />,
  },
]

export const Account = () => {
  const [isActive, setIsActive] = useState<
    'account information' | 'user posts' | 'user comments' | string
  >('account information')
  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authUser?.username) {
      navigate('/login')
    }
  })

  const Tabs = () => {
    return (
      <>
        <div className="flex justify-between border-b p-2 text-center">
          {tabs.map((tab, index) => (
            <div
              className={`${isActive === tab.value ? 'font-bold' : ''} cursor-pointer`}
              onClick={() => setIsActive(tab.value)}
              key={index}
            >
              {tab.label}
            </div>
          ))}
        </div>
        {tabs.find((tab) => tab.value === isActive)?.component}
      </>
    )
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-5">
      <Tabs />
    </div>
  )
}
