import express, { type Application, type Request, type Response } from "express"
const app:Application= express()
const port = 5000



app.use(express.json())

app.get('/', (req:Request, res:Response) => {
   res.status(200).json({
    "message":"express server is running!!",
    "author":"next level programming heroooo"
   })
})

app.post("/",(req:Request,res:Response)=>{
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})