import { load as loadLocalEnv } from '../../deps.ts'

const envConf = await loadLocalEnv({
    export: true,
    envPath: 'src/config/.env'
  })

const config: {
    port: number;
    nodeEnv: string;
    dbUri: string;
    dbName: string;
} = {
  port: parseInt(envConf.PORT as unknown as string),
  nodeEnv: envConf.NODE_ENV as unknown as string,
  dbUri: envConf.CONFIG_MONGODB_URI,
  dbName: envConf.CONFIG_MONGODB_DATABASE_NAME as unknown as string,
}

export default config
