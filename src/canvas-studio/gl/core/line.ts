import { type DrawAlgorithmContext } from '../interfaces'

export const line = (ctx: DrawAlgorithmContext, x1: number, y1: number, x2: number, y2: number) => {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
