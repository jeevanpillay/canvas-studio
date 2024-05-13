import { CanvasRenderer } from '../canvas-studio/renderer'
import { env } from '../env.js'

const constants = {
  canvasWidth: 400,
  canvasHeight: 400,
  iterations: 8,
  id: 'canvas-studio',
}

export const App = () => {
  return (
    <div className='bg-background min-h-screen'>
      <CanvasRenderer
        options={{
          id: constants.id,
          debugEngine: true,
          width: constants.canvasWidth,
          height: constants.canvasHeight,
          iterations: constants.iterations,
          filePath: env.PUBLIC_RENDER_FILE_PATH,
        }}
        className='p-md grid grid-cols-4 items-center justify-center border border-accents_7 rounded-tertiary'
      />
    </div>
  )
}
