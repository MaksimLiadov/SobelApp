export function imageDataToGray(data: ImageData): number[][] {

  const gray: number[][] = []

  for (let y = 0; y < data.height; y++) {

    const row: number[] = []

    for (let x = 0; x < data.width; x++) {

      const index = (y * data.width + x) * 4

      const r = data.data[index]
      const g = data.data[index + 1]
      const b = data.data[index + 2]

      const value = 0.299 * r + 0.587 * g + 0.114 * b

      row.push(value)
    }

    gray.push(row)
  }

  return gray
}