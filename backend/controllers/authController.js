import User, { validateUser } from "../models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signUp = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      const { error } = validateUser({ name, email, password });

      if (error)
         return res.status(400).json({ success:false, message: error.details[0].message });
      const emailExists = await User.findOne({ email });
      if (emailExists) {
         return res.status(400).json({  success:false,message: "Email already exists" });
      }
      const user = await User.create({ name, email, password });
      generateTokenAndSetCookie(user, res);
      res.status(201).json({ success:true,user: { ...user._doc, password: "" }});
   } catch (error) {
      res.status(500).json({ success:false, message: "Internal server error" });
      console.log("Error in signup controller", error.message);
   }
};

export const login = async (req,res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({  success:false,message: "Please provide email and password" });
      }
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ success:false, message: "Invalid credentials" });
      }
      const isPasswordMatch =await user.comparePassword(password);
      if (!isPasswordMatch) {
         return res.status(400).json({ success:false, message: "Invalid credentials" });
      }
      generateTokenAndSetCookie(user, res);
      res.status(200).json({ success:true, user:{...user._doc, password: "" }});
   } catch (error) {
      res.status(500).json({ success:false, message: "Internal server error" });
      console.log("Error in login controller", error.message);
   }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("ticket_token");
        res.status(200).json({ success:true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success:false, message: "Internal server error" });
        console.log("Error in logout controller", error.message);
    }
}

export const checkAuth=async (req,res)=>{
      try {
         return res.json({success:true,user:req.user})
      } catch (error) {
          console.log("Error in checking auth controller",error.message);
          return res.json({success:false,user:null})
      }
}
