import User from '../models/User.js';
import jwt from 'jsonwebtoken';
export const protectRoute=async (req,res,next)=>{
      try {
           const token=req.cookies.token;
           if(!token){
                return res.status(401).json({success:false,message:"No token found, authorization denied"})
           }
           const decoded=jwt.verify(token,process.env.JWT_SECRET);
           const user=await User.findById(decoded.id).select("-password");
           if(!user){
                return res.status(401).json({success:false,message:"Invalid token, authorization denied"})
           }
           req.user=user;
           next();
      } catch (error) {
            console.error(error);
            return res.status(500).json({success:false,message:"Internal server error"})
      }
}

export const adminRoute=(req,res,next)=>{
        if(req.user && req.user.role==="admin"){
                next();
        }else{
              return res.status(401).json({success:false,message:"Not authorized as an admin"})
        }
}