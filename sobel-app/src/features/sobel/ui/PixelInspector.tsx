// import { Matrix3x3 } from "./Matrix3x3"

// const SOBEL_X = [
//   [-1, 0, 1],
//   [-2, 0, 2],
//   [-1, 0, 1],
// ]

// const SOBEL_Y = [
//   [-1, -2, -1],
//   [0, 0, 0],
//   [1, 2, 1],
// ]

// interface Props {
//   matrix: number[][]
//   gx: number
//   gy: number
//   magnitude: number
// }

// export const PixelInspector = ({
//   matrix,
//   gx,
//   gy,
//   magnitude,
// }: Props) => {

//   return (
//     <div style={{ marginTop: 20 }}>

//       <h3>3×3 Neighborhood</h3>

//       <Matrix3x3 matrix={matrix} />

//       <h3>Sobel X Kernel</h3>

//       <Matrix3x3 matrix={SOBEL_X} />

//       <p>
//         <strong>Gx:</strong> {gx.toFixed(2)}
//       </p>

//       <h3>Sobel Y Kernel</h3>

//       <Matrix3x3 matrix={SOBEL_Y} />

//       <p>
//         <strong>Gy:</strong> {gy.toFixed(2)}
//       </p>

//       <h3>Gradient Magnitude</h3>

//       <p>
//         √(Gx² + Gy²) = {magnitude.toFixed(2)}
//       </p>

//     </div>
//   )
// }

import { Matrix3x3 } from "./Matrix3x3"
import { ExplanationBlock } from "./ExplanationBlock"

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

interface Props {
  matrix: number[][]
  gx: number
  gy: number
  magnitude: number
}

export const PixelInspector = ({
  matrix,
  gx,
  gy,
  magnitude,
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
        description="
        Это ядро используется для вычисления горизонтального градиента.
        Значения из матрицы соседства умножаются на соответствующие значения
        ядра и суммируются. В результате получается величина Gx,
        показывающая изменение яркости по горизонтали."
      >
        <Matrix3x3 matrix={SOBEL_X} />

        <p style={{ marginTop: 10 }}>
          <strong>Gx = {gx.toFixed(2)}</strong>
        </p>
      </ExplanationBlock>

      <ExplanationBlock
        title="3. Ядро Sobel Y"
        description="
        Это ядро вычисляет вертикальный градиент изображения.
        Аналогично предыдущему шагу, значения пикселей умножаются
        на соответствующие коэффициенты ядра и суммируются.
        Получается значение Gy."
      >
        <Matrix3x3 matrix={SOBEL_Y} />

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
        <p style={{ fontSize: 16 }}>
          Magnitude = √(Gx² + Gy²)
        </p>

        <p style={{ fontSize: 18 }}>
          <strong>{magnitude.toFixed(2)}</strong>
        </p>
      </ExplanationBlock>

    </div>
  )
}