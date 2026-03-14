const worker = new Worker(
  new URL("../worker/sobel.worker.ts", import.meta.url),
  { type: "module" },
);

export default worker;
