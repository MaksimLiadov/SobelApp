interface Props {
  matrix: number[][];
  kernel: number[][];
  contributions: number[];
}

export const MatrixMultiplicationView = ({
  matrix,
  kernel,
  contributions,
}: Props) => {
  return (
    <div style={{ marginTop: 12 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 70px)",
          gap: 6,
        }}
      >
        {matrix.flat().map((pixel, i) => {
          const kernelValue = kernel.flat()[i];
          const result = contributions[i];

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                padding: 8,
                textAlign: "center",
                background: "#f9fafb",
                fontFamily: "monospace",
              }}
            >
              <div>{pixel.toFixed(2)}</div>

              <div style={{ color: "#6b7280" }}>× {kernelValue.toFixed(2)}</div>

              <div style={{ fontWeight: 600 }}>= {result.toFixed(2)}</div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Сумма вкладов:</strong>

        <div style={{ marginTop: 6 }}>
          {contributions.map((v) => v.toFixed(2)).join(" + ")}
        </div>
      </div>
    </div>
  );
};
