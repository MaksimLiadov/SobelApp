import { create } from "zustand";

interface SobelState {
  original?: ImageData;
  result?: ImageData;
  threshold?:number;
  sobelMatrix:any;

  selectedPixel?: {
    x: number;
    y: number;
  };

  setOriginal: (img: ImageData) => void;
  setResult: (img: ImageData) => void;
  selectPixel: (x: number, y: number) => void;
  setThreshold: (value: number) => void,
  setSobelMatrix: (matrix: number[][]) => void,

  reset: () => void;
}

export const useSobelStore = create<SobelState>((set) => ({
  original: undefined,
  result: undefined,
  threshold: 0,
  sobelMatrix: null,

  setOriginal: (img) => set({ original: img }),

  setResult: (img) => set({ result: img }),

  selectPixel: (x, y) => set({ selectedPixel: { x, y } }),

  setThreshold: (value: number) => set({ threshold: value }),

  setSobelMatrix: (matrix: number[][]) => set({ sobelMatrix: matrix }),

  reset: () =>
    set({
      original: undefined,
      result: undefined,
      threshold: 0,
    }),
}));
