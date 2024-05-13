import { type DrawAlgorithmContext } from '../interfaces'

export const stroke = (ctx: DrawAlgorithmContext, color: string | CanvasGradient | CanvasPattern) => {
  ctx.strokeStyle = color
}
