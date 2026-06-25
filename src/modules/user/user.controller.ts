import type { Request, Response } from "express";
import { pool } from "../../db";


const createUser = async(req:Request,res:Response)=>{
    const {name,email,password,age} = req.body;

    try {
        const result = await pool.query(

        `
        INSERT INTO users (name,email,age,password) VALUES($1,$2,$3,$4)
        RETURNING *
        `
    ,[name,email,age,password])
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

export const userController ={
    createUser
}