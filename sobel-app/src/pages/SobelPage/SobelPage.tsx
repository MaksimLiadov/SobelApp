import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import worker from "../../features/sobel/lib/sobelWorker";
import { sobelToImageData } from "../../features/sobel/lib/sobelToImageData";
import { imageDataToGray } from "../../features/sobel/lib/imageUtils";
import { computePixel } from "../../features/sobel/lib/sobelPixel";

import { useSobelStore } from "../../features/sobel/model/sobelStore";

import { ImageUploader } from "../../features/sobel/ui/ImageUploader/ImageUploader";
import { CanvasView } from "../../features/sobel/ui/CanvasView";
import { PixelInspector } from "../../features/sobel/ui/PixelInspector/PixelInspector";

import "./SobelPage.css";

export const SobelPage = () => {
  const {
    original,
    result,
    threshold,
    sobelMatrix,
    setOriginal,
    setResult,
    reset,
    setThreshold,
    setSobelMatrix,
  } = useSobelStore();

  const [inspector, setInspector] = useState<any>(null);
  const [selectedPixel, setSelectedPixel] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [debouncedThreshold, setDebouncedThreshold] = useState(
    threshold as number,
  );
  const [demoModalVisible, setDemoModalVisible] = useState(false);

  const grayImage = useMemo(() => {
    if (!original) return null;
    return imageDataToGray(original);
  }, [original]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const sobelMatrix = event.data;

      if (!original) return;

      setSobelMatrix(sobelMatrix);
    };

    worker.addEventListener("message", handleMessage);

    return () => {
      worker.removeEventListener("message", handleMessage);
    };
  }, [original]);

  useEffect(() => {
    if (!sobelMatrix || !original) return;

    const image = sobelToImageData(
      sobelMatrix,
      original.width,
      original.height,
      debouncedThreshold,
    );

    setResult(image);
  }, [sobelMatrix, debouncedThreshold]);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedThreshold(threshold as number);
    }, 150);

    return () => clearTimeout(id);
  }, [threshold]);

  const demoImages = [
    "/public/demo1.jpg",
    "/public/demo2.jpg",
    "/public/demo3.jpg",
  ];

  const handleDemoSelect = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      handleLoad(img);
      setDemoModalVisible(false);
    };
  };

  const handleLoad = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, img.width, img.height);

    setOriginal(data);

    worker.postMessage(data);
  };

  const handlePixelClick = (x: number, y: number) => {
    setSelectedPixel({ x, y });

    if (!grayImage) return;

    if (
      x <= 0 ||
      y <= 0 ||
      x >= grayImage[0].length - 1 ||
      y >= grayImage.length - 1
    )
      return;

    const pixel = computePixel(grayImage, x, y);

    setInspector(pixel);
  };

  useEffect(() => {
    if (!selectedPixel || !grayImage) return;

    const { x, y } = selectedPixel;

    if (
      x <= 0 ||
      y <= 0 ||
      x >= grayImage[0].length - 1 ||
      y >= grayImage.length - 1
    )
      return;

    const pixel = computePixel(grayImage, x, y);

    setInspector(pixel);
  }, [debouncedThreshold, selectedPixel, grayImage]);

  const handleRemoveImage = () => {
    reset();

    setInspector(null);

    setSelectedPixel(null);
  };

  return (
    <div className={"page"}>
      <div className={"topBar"}>
        <h1>Вычисление контура Собеля</h1>

        <div>
          <button className="button" onClick={() => setDemoModalVisible(true)}>
            Демо
          </button>
          <Link to="/theory" className="button">
            Теория
          </Link>
        </div>
      </div>

      <div className={"actions"}>
        <ImageUploader onLoad={handleLoad} />

        {original && (
          <button className={"removeButton"} onClick={handleRemoveImage}>
            Удалить изображение
          </button>
        )}
        <div className="threshold">
          <span>Порог отображения контура:</span>
          <span className="thresholdValue">{threshold}</span>

          <input
            type="range"
            min={0}
            max={255}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={"container"}>
        <div className={"card"}>
          <div className={"cardTitle"}>Оригинал</div>

          <div className={"canvasWrapper"}>
            {original ? (
              <CanvasView
                imageData={original}
                onPixelClick={handlePixelClick}
                selectedPixel={selectedPixel}
              />
            ) : (
              <div className={"placeholder"}>Загрузите изображение</div>
            )}
          </div>
        </div>

        <div className={"card"}>
          <div className={"cardTitle"}>Контур Собеля</div>

          <div className={"canvasWrapper"}>
            {result ? (
              <CanvasView
                imageData={result}
                onPixelClick={handlePixelClick}
                selectedPixel={selectedPixel}
              />
            ) : (
              <div className={"placeholder"}>
                Изображение будет после обработки оригинала
              </div>
            )}
          </div>
        </div>
      </div>

      {original && !inspector && (
        <div className={"hint"}>
          Нажмите на любой пиксель на изображении, чтобы увидеть пошаговый
          расчет Собеля.
        </div>
      )}

      {inspector && (
        <PixelInspector
          matrix={inspector.matrix}
          gx={inspector.gx}
          gy={inspector.gy}
          magnitude={inspector.magnitude}
          contributionsX={inspector.contributionsX}
          contributionsY={inspector.contributionsY}
          original={original as ImageData}
          resultImg={result as ImageData}
          selectedPixel={selectedPixel}
          grayImage={grayImage}
        />
      )}

      {demoModalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              display: "flex",
              gap: 10,
              flexDirection: "column",
              alignItems: "center",
              width: 800,
              height: 400,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 10,
                cursor: "pointer",
                fontSize: 28,
                fontWeight: "bold",
              }}
              onClick={() => setDemoModalVisible(false)}
            >
              ×
            </div>

            <h3>Выберите картинку</h3>

            <div style={{ display: "flex", gap: 10 }}>
              {demoImages.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="demo"
                  style={{ width: 250, cursor: "pointer", borderRadius: 4 }}
                  onClick={() => handleDemoSelect(src)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
