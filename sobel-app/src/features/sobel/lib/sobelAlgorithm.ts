export const SOBEL_X = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
]

export const SOBEL_Y = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
]

export function sobel(gray: number[][]) {
  const h = gray.length
  const w = gray[0].length

  const result = Array.from({ length: h }, () =>
    Array(w).fill(0)
  )

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {

      let gx = 0
      let gy = 0

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {

          const val = gray[y + ky][x + kx]

          gx += val * SOBEL_X[ky + 1][kx + 1]
          gy += val * SOBEL_Y[ky + 1][kx + 1]
        }
      }

      result[y][x] = Math.sqrt(gx * gx + gy * gy)
    }
  }

  return result
}