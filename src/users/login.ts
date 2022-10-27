// gets basic auth data from headers
// uses argon2 + base64 to hash and encode password and match against db

// error 400 if email or password do not match
// error 400 if headers empty

import { Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import db from '../database/connection.ts'
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts"
import { Base64 } from "https://deno.land/x/bb64@1.1.0/mod.ts"
import { hash } from "https://deno.land/x/argontwo@0.1.1/mod.ts"
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { encode } from "https://deno.land/std@0.160.0/encoding/base64.ts"
import { key } from "../auth/key.ts"
import { UserSchema } from "../database/interfaces.ts"

export const login = new Router()
login.post('/login', async (ctx) => {
    try{
        const token = await create({ alg: "HS512", typ: "JWT" }, { exp: getNumericDate(60*60*3) }, key)
        const headersInput = ctx.request.headers.get('Authorization')
        const auth = headersInput?.split(' ')[1]
        const [email, password] = Base64.fromBase64String(String(auth)).toString().split(':')

        const encoder = new TextEncoder()
        const encodePassword = encoder.encode(password)
        const salt = encoder.encode(config().SALT)
        const hashedPwd = encode(hash(encodePassword, salt))


        const users = db.collection<UserSchema>("users")
        const userCheck = await users.findOne({email: email, password: hashedPwd})
        if(userCheck === undefined) return ctx.response.status = Status.BadRequest
        
        ctx.response.status = Status.OK
        ctx.response.body = {
            token: token
        }
    }catch(_e){
        ctx.response.status = Status.BadRequest
    }
})