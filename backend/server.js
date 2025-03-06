import express from "express"
import cookieParser from "cookie-parser";
import { connectToDB } from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import ticketRoutes from './routes/ticketRoutes.js';
import { ENV_VARS } from "./config/envVars.js";
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/tickets",ticketRoutes);
app.listen(ENV_VARS.PORT,()=>{
    console.log(`Server is running on port ${ENV_VARS.PORT}`)
    connectToDB();
})