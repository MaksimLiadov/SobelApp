interface Props {
  matrix: number[][];
}

export const Matrix3x3 = ({ matrix }: Props) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 60px)",
        gap: 4,
      }}
    >
      {matrix.flat().map((value, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            textAlign: "center",
            padding: 10,
            fontFamily: "monospace",
            background: "#f5f5f5",
          }}
        >
          {Math.round(value)}
        </div>
      ))}
    </div>
  );
};
