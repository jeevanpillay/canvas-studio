import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_RENDER_FILE_PATH: z.string().min(1),
  },
  runtimeEnv: process.env,
})
