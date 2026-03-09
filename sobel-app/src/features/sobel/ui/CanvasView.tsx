import { useEffect, useRef } from "react"

interface Props {
  imageData?: ImageData
  onPixelClick?: (x: number, y: number) => void
}

export const CanvasView: React.FC<Props> = ({ imageData, onPixelClick }) => {

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {

    if (!imageData || !ref.current) return

    const ctx = ref.current.getContext("2d")
    if (!ctx) return

    ref.current.width = imageData.width
    ref.current.height = imageData.height

    ctx.putImageData(imageData, 0, 0)

  }, [imageData])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {

    if (!ref.current || !onPixelClick) return

    const rect = ref.current.getBoundingClientRect()

    const x = Math.floor(e.clientX - rect.left)
    const y = Math.floor(e.clientY - rect.top)

    onPixelClick(x, y)
  }

  return <canvas ref={ref} onClick={handleClick} />
}