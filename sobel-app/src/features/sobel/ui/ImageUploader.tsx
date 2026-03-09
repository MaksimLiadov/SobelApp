interface Props {
  onLoad: (img: HTMLImageElement) => void
}

export const ImageUploader = ({ onLoad }: Props) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0]
    if (!file) return

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => onLoad(img)
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
    />
  )
}