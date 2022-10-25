import { Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import db from '../database/connection.ts'
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts"
import { key } from "../auth/key.ts"

export const login = new Router()
login.post('/login', async (ctx) => {
    const token = await create({ alg: "HS512", typ: "JWT" }, { role: "test", exp: getNumericDate(60*60*3) }, key)
    ctx.response.status = Status.OK
    ctx.response.body = {
        token: token
    }
})