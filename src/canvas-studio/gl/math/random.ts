function random(): number
function random(max: number): number
function random(min: number, max: number): number
function random<T>(arr: T[]): T

function random<T>(arg1?: number | T[], arg2?: number): number | T {
  if (arg1 === undefined && arg2 === undefined) {
    return Math.random()
  } else if (typeof arg1 === 'number' && arg2 === undefined) {
    return Math.random() * arg1
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return Math.random() * (arg2 - arg1) + arg1
  } else if (Array.isArray(arg1)) {
    const index = Math.floor(Math.random() * arg1.length)
    return arg1[index]
  }
  throw new Error('Invalid arguments for random function.')
}

export { random }
