import express, {  type Application, type Request, type Response } from "express"


import {  pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileRoute } from "./modules/profiles/profiles.route"
import { authRouter } from "./modules/auth/auth.route"
const app:Application= express()
import fs from "fs"
import logger from "./middleware/logger"


app.use(logger);



// middleware
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
   res.status(200).json({
    "message":"express server is running!!",
    "author":"next level programming heroooo"
   })
})

app.use("/api/users",userRoute)

app.use("/api/profiles",profileRoute)

app.use("/api/auth",authRouter)

export default app
