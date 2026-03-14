import { create } from "zustand";

interface SobelState {
  original?: ImageData;
  result?: ImageData;

  selectedPixel?: {
    x: number;
    y: number;
  };

  setOriginal: (img: ImageData) => void;
  setResult: (img: ImageData) => void;
  selectPixel: (x: number, y: number) => void;

  reset: () => void;
}

export const useSobelStore = create<SobelState>((set) => ({
  original: undefined,
  result: undefined,

  setOriginal: (img) => set({ original: img }),

  setResult: (img) => set({ result: img }),

  selectPixel: (x, y) => set({ selectedPixel: { x, y } }),

  reset: () =>
    set({
      original: undefined,
      result: undefined,
    }),
}));
