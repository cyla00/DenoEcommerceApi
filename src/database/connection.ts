import { MongoClient } from 'https://deno.land/x/mongo@v0.31.1/mod.ts'
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'

const client = new MongoClient()
const url = `mongodb://${config().DB_USER}:${config().DB_PASS}@${config().DB_HOST}:${config().DB_PORT}/?authSource=${config().DB_NAME}`
await client.connect(url)
console.log('db connected')
const db = client.database(config().DB_NAME)
export default db
