import { AccountComments } from '@/components/AccountComments'
import { AccountInfo } from '@/components/AccountInfo'
import { AccountPosts } from '@/components/AccountPosts'
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
        <div className="flex min-w-3xl cursor-pointer justify-around border-b p-2">
          {tabs.map((tab) => (
            <div
              className={`${isActive === tab.value ? 'font-bold' : ''}`}
              onClick={() => setIsActive(tab.value)}
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
    <div className="flex flex-col gap-5">
      <Tabs />
    </div>
  )
}
