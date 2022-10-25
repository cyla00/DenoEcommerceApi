import { Router, Status } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import db from '../database/connection.ts'

export const registration = new Router()
registration.post('/registration', (ctx) => {

    ctx.response.status = Status.OK
})