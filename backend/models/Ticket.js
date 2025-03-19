import mongoose from 'mongoose'

const ticketSchema=new mongoose.Schema({
     issue:{
        type:String,
        required:true
     },
     description:{
         type:String,
         required:true
     },
     status:{
        type:String,
        enum:["Open","In-progress","Resolved","Closed"]
     },
     priority:{
        type:String,
        enum:["low","medium","high"]
     },
     user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     }
     
},{timestamps:true})

const Ticket=mongoose.model("Ticket",ticketSchema);
export default Ticket