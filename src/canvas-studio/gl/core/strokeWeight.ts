import { type DrawAlgorithmContext } from '../interfaces'

export const strokeWeight = (ctx: DrawAlgorithmContext, weight: number) => {
  ctx.lineWidth = weight
}
