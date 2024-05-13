// canvas-studio/canvas-renderer.tsx

import { useEffect, useState } from 'react'
import { getCanvas, getCanvasContext, initCanvas } from './utils'

export type RenderOptions = {
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
  setup: (ctx: CanvasRenderingContext2D, width: number, height: number) => void
}

export type CanvasRendererOptions = {
  id: string
  debugEngine?: boolean
  width: number
  height: number
  iterations: number
  filePath: string
}

export const CanvasRenderer = ({ options, className }: { className: string; options: CanvasRendererOptions }) => {
  const [id] = useState(options.id)
  const [width] = useState(options.width)
  const [height] = useState(options.height)
  const [debugEngine] = useState(options.debugEngine)
  const [iterations] = useState(options.iterations)
  const [filePath] = useState(options.filePath)
  const [render, setRender] = useState<RenderOptions | null>(null)

  useEffect(() => {
    try {
      if (debugEngine) {
        console.log('Initializing the Engine... Give this a few moments.')
      }

      // Initialize the Canvas setting
      initCanvas(id, width, height)

      if (debugEngine) {
        console.log('Canvas was succesfully initialized...')
      }
    } catch (e) {
      if (debugEngine) {
        console.log("Something went wrong while rendering the engine. Here's the error:")
      }
      console.error(e)
    }
  }, [])

  useEffect(() => {
    import(filePath as string)
      .then((module: { render: RenderOptions }) => {
        setRender(module.render)
      })
      .catch((err) => {
        console.error('Failed to load render module:', err)
      })
  }, [])

  useEffect(() => {
    if (!render) return

    // For each iteration, render the engine and update the image, hence, we get new images for each iteration.
    for (let i = 0; i < iterations; i++) {
      if (debugEngine) {
        console.log(`Rendering iteration ${i + 1}`)
      }

      // Render the engine
      render.setup(getCanvasContext(id), width, height)
      render.draw(getCanvasContext(id), width, height)

      // Update the image
      const img = document.getElementById(`${id}-img-${i}`) as HTMLImageElement
      if (img) {
        img.src = getCanvas(id).toDataURL()
      }
    }
  }, [render?.draw, render?.setup])

  return (
    <div className={className}>
      <canvas id={id} className='hidden' />
      {[...Array(iterations)].map((_, i) => (
        <img
          key={`${id}-img-${i}`}
          id={`${id}-img-${i}`}
          className='border border-accents_7 rounded-tertiary'
          width={width}
          height={height}
        />
      ))}
    </div>
  )
}
