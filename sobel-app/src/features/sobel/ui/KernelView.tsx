interface Props {
  kernel: number[][]
}

export const KernelView = ({ kernel }: Props) => {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 50px)",
        gap: 4,
      }}
    >
      {kernel.flat().map((value, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #999",
            textAlign: "center",
            padding: 6,
            fontFamily: "monospace",
          }}
        >
          {value}
        </div>
      ))}
    </div>
  )
}