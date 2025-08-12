import { fileToImage } from './fileToImage'

export const cropToBlob = async (
  file: File,
  crop: { x: number; y: number; width: number; height: number },
  target = 512,
): Promise<Blob> => {
  const img = await fileToImage(file)

  const canvas = document.createElement('canvas')
  canvas.width = target
  canvas.height = target

  const ctx = canvas.getContext('2d')

  ctx?.save()
  ctx?.beginPath()
  ctx?.arc(target / 2, target / 2, target / 2, 0, Math.PI * 2)
  ctx?.clip()

  ctx?.drawImage(
    img,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    target,
    target,
  )

  ctx?.restore()

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), 'image/jpeg', 0.9),
  )

  return blob
}

export const blobToFile = (
  blob: Blob,
  name = `avatar-${Date.now()}.jpg`,
): File => {
  return new File([blob], name, { type: 'image/jpeg' })
}
