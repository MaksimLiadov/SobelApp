import { useEffect, useMemo, useState } from "react"

import worker from "../../features/sobel/lib/sobelWorker"
import { sobelToImageData } from "../../features/sobel/lib/sobelToImageData"
import { imageDataToGray } from "../../features/sobel/lib/imageUtils"
import { computePixel } from "../../features/sobel/lib/sobelPixel"

import { useSobelStore } from "../../features/sobel/model/sobelStore"

import { ImageUploader } from "../../features/sobel/ui/ImageUploader"
import { CanvasView } from "../../features/sobel/ui/CanvasView"
import { PixelInspector } from "../../features/sobel/ui/PixelInspector"

export const SobelPage = () => {

  const { original, result, setOriginal, setResult } = useSobelStore()

  const [inspector, setInspector] = useState<any>(null)

  const grayImage = useMemo(() => {
    if (!original) return null
    return imageDataToGray(original)
  }, [original])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {

      const sobelMatrix = event.data

      if (!original) return

      const image = sobelToImageData(
        sobelMatrix,
        original.width,
        original.height
      )

      setResult(image)
    }

    worker.addEventListener("message", handleMessage)

    return () => {
      worker.removeEventListener("message", handleMessage)
    }

  }, [original, setResult])

  const handleLoad = (img: HTMLImageElement) => {

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0)

    const data = ctx.getImageData(0, 0, img.width, img.height)

    setOriginal(data)

    worker.postMessage(data)
  }

  const handlePixelClick = (x: number, y: number) => {

    if (!grayImage) return

    if (
      x <= 0 ||
      y <= 0 ||
      x >= grayImage[0].length - 1 ||
      y >= grayImage.length - 1
    ) return

    const pixel = computePixel(grayImage, x, y)

    setInspector(pixel)
  }

  return (
    <div>

      <ImageUploader onLoad={handleLoad} />

      <div style={{ display: "flex", gap: 40 }}>

        <div>
          <h3>Original</h3>

          <CanvasView
            imageData={original}
            onPixelClick={handlePixelClick}
          />
        </div>

        <div>
          <h3>Sobel</h3>

          <CanvasView
            imageData={result}
            onPixelClick={handlePixelClick}
          />
        </div>

      </div>

      {inspector && (
        <PixelInspector
          matrix={inspector.matrix}
          gx={inspector.gx}
          gy={inspector.gy}
          magnitude={inspector.magnitude}
        />
      )}

    </div>
  )
}