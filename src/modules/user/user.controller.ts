import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";


const createUser = async(req:Request,res:Response)=>{
  

    try {
       const result = await userService.createuserintoDB(req.body)
    res.status(201).json({
        success:true, 
        message:"User created Successfully!!",
        data:result.rows[0]
    })
    } catch (error:any) {
         res.status(500).json({
        message:error.message,
        error:error
    })
    }
}

const getUser = async(req:Request,res:Response)=>{
    try {
        const result = await userService.getUserintoDB()
       
        res.status(200).json({
            success:true,
            message:"Users retrive Successfully!",
            data:result.rows

        })
    } catch (error:any) {
         res.status(500).json({
        message:error.message,
        error:error
    })
        
    }
}


export const userController ={
    createUser,
    getUser
}