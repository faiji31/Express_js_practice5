import bcrypt from "bcryptjs"
import { pool } from "../../db"
import jwt from "jsonwebtoken"
import config from "../../config"


const loginUserintoDB=async(payload:{email:string,password:string})=>{
    const {email,password} = payload

    // 1.check if the user exists
    // 2.compare the password
    // 3.generate token
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email])
        if(userData.rows[0].length ===0){
            throw new Error("user is not found!")
        }
        const user = userData.rows[0]
        

        const matchpassword = await bcrypt.compare(password,user.password)
        if(! matchpassword){
              throw new Error("user is not found!")
        }

        // generate token
        const jwtpayload={
            id:user.id,
            name:user.name,
            email:user.email,
            is_active:user.is_active
        }

        const accessToken = jwt.sign(jwtpayload,config.secret,{expiresIn:"7d"})

        return {accessToken}


}


export const authService={
    loginUserintoDB
}