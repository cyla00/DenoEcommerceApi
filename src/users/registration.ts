// - registration takes from body 2 credentials (email & password)
// - the password is argon2 hashed + salt and stored as base64 in db

// - returns a 400 error if the body is empty
// - returns a 400 error if email is not a valid format
// - returns a 400 error if the email already exists

import { Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import { hash } from "https://deno.land/x/argontwo@0.1.1/mod.ts"
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { UserSchema } from '../database/interfaces.ts'
import db from '../database/connection.ts'
import { encode } from "https://deno.land/std@0.160.0/encoding/base64.ts"

const checkEmailValidity = (email:string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!validRegex.test(email)) return false
    return true
}

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
        if(!checkEmailValidity(bodyVal.email)) return ctx.response.status = Status.BadRequest

        const emailCheck = await users.findOne({email: bodyVal.email})
        if(emailCheck != undefined) return ctx.response.status = Status.BadRequest
        
        
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
            createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            lastLogin: ``,
            modifiedAt: ``,
            deletedAt: ``,
        })
        ctx.response.status = Status.OK
    }catch(_e){
        ctx.response.status = Status.BadRequest
    }
})