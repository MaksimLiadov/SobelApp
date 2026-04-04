import { Matrix3x3 } from "../Matrix3x3";
import { ExplanationBlock } from "../ExplanationBlock";
import { MatrixMultiplicationView } from "../MatrixMultiplicationView";

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
}

export const PixelInspector = ({
  matrix,
  gx,
  gy,
  magnitude,
  contributionsX,
  contributionsY,
}: Props) => {
  return (
    <div style={{ marginTop: 30 }}>
      <h2>Пошаговое вычисление оператора Собеля</h2>

      <ExplanationBlock title="1. Матрица соседних пикселей (3×3)">
        <Matrix3x3 matrix={matrix} />
      </ExplanationBlock>

      <ExplanationBlock title="2. Ядро Sobel X">
        <Matrix3x3 matrix={SOBEL_X} />

        <MatrixMultiplicationView
          matrix={matrix}
          kernel={SOBEL_X}
          contributions={contributionsX.map((c) => c.result)}
        />

        <p style={{ marginTop: 10 }}>
          <strong>Gx = {gx.toFixed(2)}</strong>
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
          <strong>Gy = {gy.toFixed(2)}</strong>
        </p>
      </ExplanationBlock>

      <ExplanationBlock
        title="4. Итоговый градиент"
      >
        <p style={{ fontSize: 16 }}>Величина градиента = √(Gx² + Gy²)</p>

        <p style={{ fontSize: 18 }}>
          <strong>{magnitude.toFixed(2)}</strong>
        </p>
      </ExplanationBlock>
    </div>
  );
};
