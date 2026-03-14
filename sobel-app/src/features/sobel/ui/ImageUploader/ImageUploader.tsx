import { useRef } from "react";
import type { ChangeEvent } from "react";

import "./ImageUploader.css";

interface Props {
  onLoad: (image: HTMLImageElement) => void;
}

export const ImageUploader = ({ onLoad }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const img = new Image();

    img.src = URL.createObjectURL(file);

    img.onload = () => onLoad(img);

    e.target.value = "";
  };

  return (
    <div className={"container"}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={"fileInput"}
      />

      <button onClick={handleClick} className={"uploadButton"}>
        Загрузить изображение
      </button>
    </div>
  );
};
