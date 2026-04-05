import { Matrix3x3 } from "../Matrix3x3";
import { ExplanationBlock } from "../ExplanationBlock";
import { MatrixMultiplicationView } from "../MatrixMultiplicationView";
import { computePixel } from "../../lib/sobelPixel";
import "./PixelInspector.css";

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

interface Contribution {
  pixel: number;
  kernel: number;
  result: number;
}

interface Props {
  matrix: number[][];
  gx: number;
  gy: number;
  magnitude: number;
  contributionsX: Contribution[];
  contributionsY: Contribution[];
  original: ImageData;
  resultImg: ImageData;
  selectedPixel: { x: number; y: number } | null;
  grayImage: any;
}

export const PixelInspector = ({
  matrix,
  gx,
  gy,
  magnitude,
  contributionsX,
  contributionsY,
  original,
  resultImg,
  selectedPixel,
  grayImage,
}: Props) => {
  const getColorMatrixFromImage = (
    image: ImageData,
    x: number,
    y: number,
  ): string[][] => {
    const { width, data } = image;

    const result: string[][] = [];

    for (let dy = -1; dy <= 1; dy++) {
      const row: string[] = [];

      for (let dx = -1; dx <= 1; dx++) {
        const px = x + dx;
        const py = y + dy;

        const index = (py * width + px) * 4;

        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        row.push(`rgb(${r}, ${g}, ${b})`);
      }

      result.push(row);
    }

    return result;
  };

  const colorMatrix =
    original && selectedPixel
      ? getColorMatrixFromImage(original, selectedPixel.x, selectedPixel.y)
      : null;

  const rgbToGray = (rgb: string) => {
    const match = rgb.match(/\d+/g);
    if (!match) return "rgb(0,0,0)";
    const [r, g, b] = match.map(Number);
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    return `rgb(${gray},${gray},${gray})`;
  };

  const grayMatrix = colorMatrix?.map((row) => row.map(rgbToGray));

  const getColorMatrixFromResult = (
    image: ImageData,
    x: number,
    y: number,
  ): string[][] => {
    const { width, data } = image;
    const result: string[][] = [];

    for (let dy = -1; dy <= 1; dy++) {
      const row: string[] = [];
      for (let dx = -1; dx <= 1; dx++) {
        const px = x + dx;
        const py = y + dy;

        const index = (py * width + px) * 4;

        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];

        row.push(`rgb(${r},${g},${b})`);
      }
      result.push(row);
    }

    return result;
  };

  const resultColorMatrix =
    resultImg && selectedPixel
      ? getColorMatrixFromResult(resultImg, selectedPixel.x, selectedPixel.y)
      : undefined;

  const getLocalMagnitudeMatrix = (
    grayImage: number[][],
    x: number,
    y: number,
  ): number[][] => {
    const matrix: number[][] = [];

    for (let dy = -1; dy <= 1; dy++) {
      const row: number[] = [];
      for (let dx = -1; dx <= 1; dx++) {
        const px = x + dx;
        const py = y + dy;

        const { magnitude } = computePixel(grayImage, px, py);
        row.push(magnitude);
      }
      matrix.push(row);
    }

    return matrix;
  };

  const localMagnitudeMatrix =
    grayImage && selectedPixel
      ? getLocalMagnitudeMatrix(grayImage, selectedPixel.x, selectedPixel.y)
      : undefined;

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Пошаговое вычисление оператора Собеля</h2>

      <ExplanationBlock title="1. Матрица соседних пикселей (3×3)">
        <div className="flex-row">
          {colorMatrix && (
            <div>
              <Matrix3x3
                matrix={matrix}
                colorMatrix={colorMatrix}
                title="Оригинал"
              />
            </div>
          )}

          {colorMatrix && (
            <div>
              <Matrix3x3 matrix={matrix} colorMatrix={grayMatrix} title="ЧБ" />
            </div>
          )}

          <Matrix3x3 matrix={matrix} title="Числовая" />

          {selectedPixel && localMagnitudeMatrix && (
            <Matrix3x3
              matrix={localMagnitudeMatrix}
              title="Градиенты"
            />
          )}

          <Matrix3x3
            matrix={matrix}
            colorMatrix={resultColorMatrix}
            title="Результат"
          />
        </div>
      </ExplanationBlock>

      <ExplanationBlock title="2. Ядро Sobel X">
        <Matrix3x3 matrix={SOBEL_X} />

        <MatrixMultiplicationView
          matrix={matrix}
          kernel={SOBEL_X}
          contributions={contributionsX.map((c) => c.result)}
        />

        <p style={{ marginTop: 10 }}>
          <strong>Gx = {gx}</strong>
        </p>
      </ExplanationBlock>

      <ExplanationBlock title="3. Ядро Sobel Y">
        <Matrix3x3 matrix={SOBEL_Y} />

        <MatrixMultiplicationView
          matrix={matrix}
          kernel={SOBEL_Y}
          contributions={contributionsY.map((c) => c.result)}
        />

        <p style={{ marginTop: 10 }}>
          <strong>Gy = {gy}</strong>
        </p>
      </ExplanationBlock>

      <ExplanationBlock title="4. Итоговый градиент">
        <div>
          <strong>Величина градиента</strong> = √(Gx² + Gy²) = √({gx}² + {gy}²)
          = {magnitude}
        </div>
      </ExplanationBlock>
    </div>
  );
};
