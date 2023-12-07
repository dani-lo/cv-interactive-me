import { 
  oak_Application, 
  oak_FlashServer,
  oak_hasFlash
} from './deps.ts'

import { oakCors } from './deps.ts';

import config from './src/config/default.ts'
import appRouter from './src/routes/index.ts'

// console.log(oak_hasFlash())

// const appOptions = oak_hasFlash() ? { serverConstructor: oak_FlashServer } : undefined;
const app = new oak_Application()

app.use(oakCors())

const port = 8000 // config.port

appRouter.init(app)

app.addEventListener('listen', ({ port, secure }: { port: number, secure: boolean }) => { 
  console.log(`? Server started on ${secure ? 'https://' : 'http://'}localhost:${port}`)
})

app.listen({ port })