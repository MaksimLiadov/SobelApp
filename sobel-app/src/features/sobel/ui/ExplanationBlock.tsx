interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ExplanationBlock = ({ title, children, description }: Props) => {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      <h3>{title}</h3>

      <p
        style={{
          fontSize: 14,
          color: "#444",
          lineHeight: 1.5,
          maxWidth: 600,
        }}
      >
        {description}
      </p>

      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
};
