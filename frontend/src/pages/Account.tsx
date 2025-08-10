import { AccountComments } from '@/components/Account/AccountComments'
import { AccountInfo } from '@/components/Account/AccountInfo'
import { AccountPosts } from '@/components/Account/AccountPosts'
import { useAuth } from '@/context/AuthProvider/useAuth'
import { JSX, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type TabsProps = {
  label: string
  value: string
  component: JSX.Element
}

const tabs = [
  {
    label: 'Account Info',
    value: 'account information',
    component: <AccountInfo />,
  },
  {
    label: 'Posts',
    value: 'user posts',
    component: <AccountPosts />,
  },
  {
    label: 'Comments',
    value: 'user comments',
    component: <AccountComments />,
  },
]

export const Account = () => {
  const [isActive, setIsActive] = useState<TabsProps>(() => {
    const saved = localStorage.getItem('accountView')
    const value = saved || 'account information'
    return tabs.find((tab) => tab.value === value) ?? tabs[0]
  })

  const { authUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('accountView', isActive.value)
    if (!authUser?.username) {
      navigate('/login')
    }
  }, [isActive.value, authUser, navigate])

  const Tabs = () => {
    return (
      <>
        <div className="text-md flex justify-between border-b p-2 text-center tracking-wide sm:text-xl">
          {tabs.map((tab, index) => (
            <div
              className={`${isActive.value === tab.value ? 'font-bold' : ''} cursor-pointer`}
              onClick={() => setIsActive(tab)}
              key={index}
            >
              {tab.label}
            </div>
          ))}
        </div>
        {tabs.find((tab) => tab.value === isActive.value)?.component}
      </>
    )
  }

  return (
    <div className="flex w-full max-w-4xl flex-col gap-5 px-3">
      <Tabs />
    </div>
  )
}
