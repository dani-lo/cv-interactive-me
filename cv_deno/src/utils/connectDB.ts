import { MongoClient, Database } from '../../deps.ts';
import { Some, None, Option } from '../../deps.ts'

import config from '../config/default.ts';

const {dbUri, dbName} = config

let db: Option<Database> = None();
console.log('====================')
console.log(config)
console.log("+++++++++++++++++++++++++++++++++= Deno.env.get('COMPOSE')", Deno.env.get('COMPOSE'))
try {
    const client = new MongoClient()
    await client.connect(dbUri)

    db = Some(client.database(dbName))
} catch (e) {
    console.log('ERROR FROM MONGO:: dbUri')
    console.log(dbUri)
    console.log(e)
}

export { db }