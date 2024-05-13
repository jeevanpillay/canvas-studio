import { type DrawAlgorithmContext } from '../interfaces'

export const fill = (ctx: DrawAlgorithmContext, color: string | CanvasGradient | CanvasPattern) => {
  ctx.fillStyle = color
}
