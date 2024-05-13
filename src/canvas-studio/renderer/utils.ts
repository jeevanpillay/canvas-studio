export const initCanvas = (id: string, width: number, height: number) => {
  const canvas = getCanvas(id)
  canvas.width = width
  canvas.height = height
}

export const getCanvas = (id: string) => {
  return document.getElementById(id) as HTMLCanvasElement
}

export const getCanvasContext = (id: string) => {
  return getCanvas(id).getContext('2d')!
}

export const clearCanvas = (id: string) => {
  const canvas = getCanvas(id)
  const context = getCanvasContext(id)
  context.clearRect(0, 0, canvas.width, canvas.height)
}
