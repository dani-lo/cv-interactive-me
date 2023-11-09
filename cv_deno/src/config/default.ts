import { load as loadLocalEnv } from '../../deps.ts'

const dockerComposeEnv = Deno.env.get('COMPOSE')

const envConf = await loadLocalEnv({
    export: true,
    envPath: '.env'
  })

const config: {
    port: number;
    nodeEnv: string;
    dbUri: string;
    dbName: string;
} = {
  port: parseInt(envConf.PORT as unknown as string),
  nodeEnv: envConf.NODE_ENV as unknown as string,
  dbUri: dockerComposeEnv ? envConf.MONGODB_URI_DOCKER as unknown as string : envConf.MONGODB_URI_LOCAL as unknown as string,
  dbName: envConf.MONGODB_DATABASE_NAME as unknown as string,
}

export default config
