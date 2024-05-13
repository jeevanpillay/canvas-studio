import { type DrawAlgorithmContext } from '../interfaces'

export const background = (ctx: DrawAlgorithmContext, color: string) => {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
