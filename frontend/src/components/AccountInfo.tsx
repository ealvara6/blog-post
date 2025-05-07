import { useAuth } from '@/context/AuthProvider/useAuth'

export const AccountInfo = () => {
  const { authUser } = useAuth()

  const tabInfo = [
    { label: 'Change Username', subtext: authUser?.username },
    { label: 'Change Email', subtext: authUser?.email },
    { label: 'Change Password' },
    { label: 'Delete Account' },
  ]

  const Tabs = () => {
    const tabs = tabInfo.map((tab) => {
      return (
        <div
          className={`flex min-h-16 w-full cursor-pointer rounded border border-gray-500 p-2 ${tab.label === 'Delete Account' ? 'bg-red-700' : ''}`}
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
    </div>
  )
}
