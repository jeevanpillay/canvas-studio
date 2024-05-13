import { type DrawAlgorithmContext } from '../interfaces'

export const rect = (ctx: DrawAlgorithmContext, x: number, y: number, w: number, h: number) => {
  ctx.fillRect(x, y, w, h)
}
