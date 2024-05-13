import { mag } from './mag'

export const dist = (x1: number, y1: number, x2: number, y2: number) => {
  return mag(x2 - x1, y2 - y1)
}
