interface Props {
  matrix: number[][];
  colorMatrix?: string[][];
  title?: string;
}

export const Matrix3x3 = ({ matrix, colorMatrix, title }: Props) => {
  const isColorMatrix = colorMatrix !== undefined;

return (
    <div style={{ display: "inline-block" }}>
      {title && (
        <div style={{ marginBottom: 4, fontWeight: "bold", textAlign: "center" }}>
          {title}
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 40px)",
          gap: 2,
        }}
      >
        {matrix.flatMap((row, i) =>
          row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: colorMatrix ? colorMatrix[i][j] : "transparent",
                border: "1px solid #ddd",
                fontFamily: "monospace",
              }}
            >
              {!isColorMatrix && value}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
