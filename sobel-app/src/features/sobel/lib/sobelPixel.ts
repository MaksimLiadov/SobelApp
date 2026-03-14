const SOBEL_X = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];

const SOBEL_Y = [
  [-1, -2, -1],
  [0, 0, 0],
  [1, 2, 1],
];

export interface Contribution {
  pixel: number;
  kernel: number;
  result: number;
}

export function computePixel(gray: number[][], x: number, y: number) {
  const matrix: number[][] = [];

  const contributionsX: Contribution[] = [];
  const contributionsY: Contribution[] = [];

  let gx = 0;
  let gy = 0;

  for (let ky = -1; ky <= 1; ky++) {
    const row: number[] = [];

    for (let kx = -1; kx <= 1; kx++) {
      const pixel = gray[y + ky][x + kx];

      const kxVal = SOBEL_X[ky + 1][kx + 1];
      const kyVal = SOBEL_Y[ky + 1][kx + 1];

      const contribX = pixel * kxVal;
      const contribY = pixel * kyVal;

      gx += contribX;
      gy += contribY;

      contributionsX.push({
        pixel,
        kernel: kxVal,
        result: contribX,
      });

      contributionsY.push({
        pixel,
        kernel: kyVal,
        result: contribY,
      });

      row.push(pixel);
    }

    matrix.push(row);
  }

  const magnitude = Math.sqrt(gx * gx + gy * gy);

  return {
    matrix,
    gx,
    gy,
    magnitude,
    contributionsX,
    contributionsY,
  };
}
