export function sobelToImageData(
  sobel: number[][],
  width: number,
  height: number
): ImageData {

  const imageData = new ImageData(width, height)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      const index = (y * width + x) * 4

      const value = Math.min(255, sobel[y][x])

      imageData.data[index] = value
      imageData.data[index + 1] = value
      imageData.data[index + 2] = value
      imageData.data[index + 3] = 255
    }
  }

  return imageData
}