import { Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { hash } from "https://deno.land/x/argontwo@0.1.1/mod.ts"
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { UserSchema } from '../database/interfaces.ts'
import db from '../database/connection.ts'
import { encode } from "https://deno.land/std@0.160.0/encoding/base64.ts"

export const registration = new Router()
registration.post('/registration', async (ctx) => {
    try{
        const users = db.collection<UserSchema>("users")
        const date = new Date()
        const body = ctx.request.body({type: 'json'})
        
        const bodyVal = await body.value.then((values) => {
            return values
        })
        
        if(Object.keys(bodyVal).length === 0) return ctx.response.status = Status.BadRequest
        
        const encoder = new TextEncoder()
        const password = encoder.encode(bodyVal.password)
        const salt = encoder.encode(config().SALT)
        const hashedPwd = encode(hash(password, salt))
        
        await users.insertOne({
            id: crypto.randomUUID(),
            firstName: '',
            lastName: '',
            email: bodyVal.email,
            password: hashedPwd,
            adresses: [],
            createdAt: `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            lastLogin: ``,
            modifiedAt: ``,
            deletedAt: ``,
        })
        ctx.response.status = Status.OK
    }catch(_e){
        ctx.response.status = Status.BadRequest
    }
})