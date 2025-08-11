import { useAuth } from '@/context/AuthProvider/useAuth'
import { toImageUrl } from '@/utils/imageUrl'
import { PencilIcon } from '@heroicons/react/16/solid'
import React, { useRef, useState } from 'react'
import { Modal } from '../Shared/Modal'
import { Button } from '../Shared/Button'
import { useGetUser, useUpdateAvatar } from '@/hooks/useUser'

export const EditAvatar = () => {
  const { authUser } = useAuth()
  const { data: user, isFetching } = useGetUser()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [tempUrl, setTempUrl] = useState<string | null>(null)
  const { mutate: changeAvatar, isPending } = useUpdateAvatar()

  const openPicker = () => inputRef.current?.click()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setTempUrl(URL.createObjectURL(f))
  }

  const onSave = () => {
    if (!file) return
    changeAvatar(file)
    setTempUrl(null)
    setFile(null)
  }

  const onClose = () => {
    setTempUrl(null)
  }

  if (isFetching) return <div>Loading...</div>

  const src = tempUrl ?? toImageUrl(user.user.profilePictureUrl)

  return (
    <>
      <button
        type="button"
        className="relative cursor-pointer"
        onClick={openPicker}
      >
        <img
          src={src}
          alt={`${authUser?.username}'s avatar`}
          className="h-18 w-18 rounded-full object-cover"
        />
        <div className="absolute inset-0 z-10 h-full w-full rounded-4xl bg-black/20" />
        <div className="absolute inset-0 z-20 self-center justify-self-center">
          <PencilIcon className="w-7" />
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={onChange}
        />
      </button>
      {tempUrl && (
        <Modal onClose={onClose} className="!max-w-fit p-6">
          <div className="flex flex-col gap-4">
            <img
              src={src}
              alt={`${authUser?.username}'s avatar`}
              className="h-52 w-52 self-center rounded-full object-cover"
            />
            <div className="flex gap-5">
              <Button variant="dangerTransparent" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button
                variant="transparent"
                className="dark:border-accent-darkTheme border-accent"
                onClick={() => onSave()}
              >
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
