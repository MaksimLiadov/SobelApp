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

      <ExplanationBlock
        title="1. Матрица соседних пикселей (3×3)"
        description="
        Для вычисления границы используется окно 3×3 вокруг выбранного пикселя.
        Каждое число — это интенсивность пикселя после перевода изображения в
        оттенки серого. Центральный элемент — пиксель, для которого
        вычисляется градиент."
      >
        <Matrix3x3 matrix={matrix} />
      </ExplanationBlock>

      <ExplanationBlock
        title="2. Ядро Sobel X"
        description={`
        Матрица Sobel X используется для обнаружения вертикальных границ.
        Она аппроксимирует производную изображения по оси X (изменение яркости
        слева направо).

        Левая часть матрицы имеет отрицательные значения, правая — положительные.
        Это позволяет вычислить разницу между правой и левой сторонами изображения.

        Центральная строка имеет коэффициенты -2 и 2, которые усиливают вклад
        центральных пикселей. Верхняя и нижняя строки имеют коэффициенты -1 и 1,
        выполняющие сглаживание и уменьшающие влияние шума.

        Таким образом, ядро Sobel объединяет вычисление градиента и сглаживание.`}
      >
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

      <ExplanationBlock
        title="3. Ядро Sobel Y"
        description={`
        Матрица Sobel Y используется для обнаружения горизонтальных границ.
        Она вычисляет производную изображения по оси Y (изменение яркости
        сверху вниз).
        
        Верхняя строка содержит отрицательные значения, нижняя — положительные.
        Это позволяет вычислить разницу между верхней и нижней частями изображения.

        Коэффициенты 1-2-1 выполняют сглаживание, что делает оператор Собеля
        устойчивым к шуму. Центральный столбец имеет больший вес, поэтому
        центральные пиксели влияют на результат сильнее.

        В результате получается значение Gy — вертикальный градиент.`}
      >
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
        description="
        После вычисления горизонтального и вертикального градиента
        рассчитывается итоговая величина градиента.
        Она показывает силу границы (edge strength) в данной точке."
      >
        <p style={{ fontSize: 16 }}>Magnitude = √(Gx² + Gy²)</p>

        <p style={{ fontSize: 18 }}>
          <strong>{magnitude.toFixed(2)}</strong>
        </p>
      </ExplanationBlock>
    </div>
  );
};
