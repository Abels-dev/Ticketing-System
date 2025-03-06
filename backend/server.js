import express from "express"
import { connectToDB } from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import { ENV_VARS } from "./config/envVars.js";
const app=express();

app.use(express.json());
app.use("/api/auth",authRoutes);

app.listen(ENV_VARS.PORT,()=>{
    console.log(`Server is running on port ${ENV_VARS.PORT}`)
    connectToDB();
})