import { sobel } from "../lib/sobelAlgorithm"
import { imageDataToGray } from "../lib/imageUtils"

self.onmessage = (event) => {

  const imageData: ImageData = event.data

  const gray = imageDataToGray(imageData)

  const result = sobel(gray)

  self.postMessage(result)
}