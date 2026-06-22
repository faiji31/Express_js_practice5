import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"
const app:Application= express()
const port = config.port


// middleware
app.use(express.json())

const pool = new Pool({
    connectionString:config.connection_string
})

const initDB=async()=>{
      try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(20) UNIQUE NOT NULL,
            age INT NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT  NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            `)
            console.log("database connected successfully!!!")
      } catch (error:any) {
        console.log(error)
        
      }
}
initDB()

app.get('/', (req:Request, res:Response) => {
   res.status(200).json({
    "message":"express server is running!!",
    "author":"next level programming heroooo"
   })
})

app.post("/api/users",async(req:Request,res:Response)=>{
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
})

app.get("/api/users",async(req:Request,res:Response)=>{
    try {
        const result = await pool.query(
            `
            SELECT * FROM users
            `
        )
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
})

app.get('/api/users/:id',async(req:Request,res:Response)=>{
    const {id}= req.params

    try {
        const result =await pool.query(
            `SELECT * FROM users WHERE id=$1`,[id]
        )
        if(result.rows.length===0){
             res.status(404).json({
            success:false,
            message:"Users is Not Found!!!",
            data:{}
           

        })
        }
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

})

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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})