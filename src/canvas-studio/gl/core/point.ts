import { type DrawAlgorithmContext } from '../interfaces'
import { rect } from './rect'

export const point = (ctx: DrawAlgorithmContext, x: number, y: number) => {
  rect(ctx, x, y, 1, 1)
}
