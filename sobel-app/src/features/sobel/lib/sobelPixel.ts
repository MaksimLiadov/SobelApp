const SOBEL_X = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
]

const SOBEL_Y = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
]

export function computePixel(
  gray: number[][],
  x: number,
  y: number
) {

  const matrix: number[][] = []

  let gx = 0
  let gy = 0

  for (let ky = -1; ky <= 1; ky++) {

    const row: number[] = []

    for (let kx = -1; kx <= 1; kx++) {

      const value = gray[y + ky][x + kx]

      gx += value * SOBEL_X[ky + 1][kx + 1]
      gy += value * SOBEL_Y[ky + 1][kx + 1]

      row.push(value)
    }

    matrix.push(row)
  }

  const magnitude = Math.sqrt(gx * gx + gy * gy)

  return {
    matrix,
    gx,
    gy,
    magnitude,
  }
}