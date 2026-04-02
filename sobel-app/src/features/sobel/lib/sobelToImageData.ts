export function sobelToImageData(
  sobel: number[][],
  width: number,
  height: number,
  threshold: number,
): ImageData {
  const imageData = new ImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      const raw = sobel[y][x];
      const value = raw < threshold ? 0 : Math.min(255, raw);

      imageData.data[index] = value;
      imageData.data[index + 1] = value;
      imageData.data[index + 2] = value;
      imageData.data[index + 3] = 255;
    }
  }

  return imageData;
}
