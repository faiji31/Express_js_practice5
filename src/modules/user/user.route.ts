import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";


const router = Router()


router.post("/",userController.createUser)
router.get("/",userController.getUser)




export const userRoute = router