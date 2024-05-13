export interface Canvas<T, C> {
  width: number
  height: number

  createCanvas(): T
  getCanvas(): T
  getContext(): C
  getContext2D(): C
}

/**
 * A canvas context that can be used to draw on a canvas.
 * @note add more types canvas context if needed; e.g skia-constructor, napi, etc..
 */
export type DrawAlgorithmContext = CanvasRenderingContext2D

/**
 * A function that can be used to draw on a canvas.
 */
export type MultiDrawAlgorithm =
  | ((ctx: DrawAlgorithmContext, width: number, height: number) => void)
  | ((ctx: DrawAlgorithmContext) => void)
