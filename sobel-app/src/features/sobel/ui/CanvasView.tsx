import { useEffect, useRef } from "react";

interface Props {
  imageData?: ImageData;
  onPixelClick?: (x: number, y: number) => void;
  selectedPixel?: { x: number; y: number } | null;
}

export const CanvasView: React.FC<Props> = ({
  imageData,
  onPixelClick,
  selectedPixel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    ctx.putImageData(imageData, 0, 0);

    if (selectedPixel) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;

      ctx.strokeRect(selectedPixel.x - 2, selectedPixel.y - 2, 5, 5);
    }
  }, [imageData, selectedPixel]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !onPixelClick) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    onPixelClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{
        cursor: "crosshair",
      }}
    />
  );
};
