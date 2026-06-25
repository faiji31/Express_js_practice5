import express, {  type Application, type Request, type Response } from "express"


import {  pool } from "./db"
import { userRoute } from "./modules/user/user.route"
const app:Application= express()



// middleware
app.use(express.json())




app.get('/', (req:Request, res:Response) => {
   res.status(200).json({
    "message":"express server is running!!",
    "author":"next level programming heroooo"
   })
})

app.use("/api/users",userRoute)

app.use("/api/users",userRoute)


app.use("/api/users",userRoute)

app.put('/api/users/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const {name,age,password,is_active} = req.body
    try {
        const result = await pool.query(`
        UPDATE users SET name=COALESCE($1,name),age=COALESCE($2,age),password=COALESCE($3,password),is_active=COALESCE($4,is_active)
        WHERE id=$5  RETURNING *
        
        `,[name,age,password,is_active,id])

        if(result.rows.length === 0){
              res.status(404).json({
            success:false,
            message:"Users is Not Found!!!",
            data:{}
           

        })

        }

        res.status(200).json({
            success:true,
            message:"Users updated Successfully!",
            data:result.rows[0]

        })

    } catch (error:any) {
         res.status(500).json({
        message:error.message,
        error:error
    })
        
    }
        
})


app.delete("/api/users/:id",async(req:Request,res:Response)=>{
  const {id} = req.params
  try {
    const result = await pool.query(`
        DELETE FROM users WHERE id = $1
        `,[id])

        if(result.rowCount ===0){
             res.status(404).json({
            success:false,
            message:"Users is Not Found!!!",
            data:{}
           

        })
            

        }
         res.status(200).json({
            success:true,
            message:"Users Deleted  Successfully!",
            data:result.rows[0]

        })

    
  } catch (error:any) {
     res.status(500).json({
        message:error.message,
        error:error
    })
  }
})

export default app
