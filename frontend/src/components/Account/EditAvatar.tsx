import { useAuth } from '@/context/AuthProvider/useAuth'
import { toImageUrl } from '@/utils/imageUrl'
import { PencilIcon } from '@heroicons/react/16/solid'
import React, { useRef, useState } from 'react'
import { Modal } from '../Shared/Modal'
import { Button } from '../Shared/Button'
import { useGetUser, useUpdateAvatar } from '@/hooks/useUser'
import { Error } from '../Shared/Error'
import Cropper from 'react-easy-crop'
import { blobToFile, cropToBlob } from '@/utils/cropToBlob'
import { Link } from '../Shared/Link'

const MAX_BYTES = 2 * 1024 * 1024 //2MB
const ALLOWED_MIME = new Set(['image/png', 'image/jpeg'])

export const EditAvatar = () => {
  const { authUser } = useAuth()
  const { data: user, isFetching } = useGetUser()
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [tempUrl, setTempUrl] = useState<string | null>(null)
  const { mutateAsync: changeAvatar, isPending } = useUpdateAvatar()
  const [fileError, setFileError] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number
    y: number
    width: number
    height: number
  } | null>(null)

  const openPicker = () => inputRef.current?.click()

  const onCropComplete = (
    croppedArea: unknown,
    croppedAreaPixels: { x: number; y: number; width: number; height: number },
  ) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setTempUrl(URL.createObjectURL(f))
  }

  const onSave = async () => {
    if (!file || !croppedAreaPixels) return

    setFileError(null)

    const blob = await cropToBlob(file, croppedAreaPixels, 512)

    if (blob.size > MAX_BYTES) {
      setFileError('Image must be 2MB or smaller')
      return
    }

    if (!ALLOWED_MIME.has(file.type)) {
      setFileError('Only PNG or JPEG images are allowed')
      return
    }

    const croppedFile = blobToFile(blob)

    changeAvatar(croppedFile, {
      onSuccess: () => {
        setTempUrl(null)
        setFile(null)
      },
    })
  }

  const onClose = () => {
    setTempUrl(null)
    setFile(null)
  }

  if (isFetching) return <div>Loading...</div>

  const src = tempUrl ?? toImageUrl(user.user.profilePictureUrl)

  return (
    <>
      <div className="flex flex-col items-center gap-4">
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
          <div className="bg-background-darkTheme/100 absolute inset-x-12 inset-y-0 h-6 w-6 rounded-full">
            <PencilIcon className="z-10 h-6" />
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={onChange}
          />
        </button>
        <button
          className="dark:text-accent-darkTheme text-accent cursor-pointer text-base underline underline-offset-4"
          type="button"
          onClick={openPicker}
        >
          Update Picture
        </button>
      </div>
      {tempUrl && (
        <Modal onClose={onClose} className="!max-w-fit p-6">
          <div className="flex flex-col gap-4">
            <div className="text-center text-2xl font-semibold">
              Profile Picture
            </div>
            <div className="relative h-[60svh] w-[80vw] max-w-[420px] overflow-hidden">
              <Cropper
                image={src}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
            />
            {fileError && <Error>{fileError}</Error>}
            <div className="flex justify-end gap-5">
              <Button variant="dangerTransparent" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="dark:border-accent-darkTheme border-accent"
                isInactive={isPending}
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
