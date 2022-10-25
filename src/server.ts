// deno run --allow-net --allow-env --allow-read --watch ./src/database/seed.ts FOR DATABASE SEED
// deno run --allow-net --allow-read --allow-sys --watch ./src/server.ts TO RUN SERVER
import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts"
import os from "https://deno.land/x/dos@v0.11.0/mod.ts"
import { jwtMiddleware } from './auth/jwt.ts'

// routers
import { registration } from './users/registration.ts' // registration
import { login } from './users/login.ts' // login

const app = new Application()

// open routes
app.use(login.routes(), login.allowedMethods()) // login
app.use(registration.routes(), registration.allowedMethods()) // registration


//protected routes


console.log(`http://${os.hostname()}:${config().SERVER_PORT}`)
await app.listen({port: Number(config().SERVER_PORT)})
