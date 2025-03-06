import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export const generateTokenAndSetCookie=(user,res)=>{
      const token=jwt.sign({id:user._id},ENV_VARS.JWT_SECRET,{
        expiresIn:"15d"
      })
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:15*24*60*60*1000,
            secure:ENV_VARS.NODE_ENV==='production',
            sameSite:"strict",
        })
        return token;
} 