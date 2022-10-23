import { MongoClient } from 'https://deno.land/x/mongo@v0.31.1/mod.ts'
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import db_json from './db_config.json' assert { type: "json" }
import { UserSchema, CategoriesSchema, TagSchema, ProductSchema } from './interfaces.ts'

const client = new MongoClient()

const url = `mongodb://${config().DB_USER}:${config().DB_PASS}@${config().DB_HOST}:${config().DB_PORT}/?authSource=${config().DB_NAME}`

export const db_build = async() => {
    try{
        await client.connect(url)
        console.log('db connected')
        const db = client.database(config().DB_NAME)

        db_json.collections.forEach((element:string) => {
            const collectionExists = db.listCollectionNames()

            if(collectionExists === false){
                db.createCollection(element)
                console.log(`created collection ${element}`)
            }

        })

        // const users = db.collection<UserSchema>('users')

    }
    catch(err:any){
        console.log(err)
    }
}

db_build()