import { useState } from "react"
import { NavBar } from "../components/NavBar"
import {toast} from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const CreatePage = () => {
  const [formData,setFormData]=useState({
        issue:"",
        priority:"",
        description:""
  });
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!formData.issue || !formData.priority || !formData.description){
            toast.error("All fields are required");
            return;
        }
        try {
            await axios.post("/api/tickets",formData);
            toast.success("Ticket created successfully");
            navigate("/")
        } catch (error) {
            toast.error(error.response.data.message||"Something went wrong");
        }
  }
  return (
    <div className="h-screen bg-slate-100">
        <NavBar/>
        <div className="p-5 mx-auto max-w-6xl">
            <h1 className="font-bold text-3xl text-slate-900 text-center mt-3">Lets us Support you. Create Your Ticket here</h1>
            <form className="flex flex-col gap-5 max-w-2xl mt-4">
                <label htmlFor="issue" className="font-bold text-2xl text-slate-900">Issue: </label>
                <input type="text" id="issue" className="p-3 border border-slate-300 
                rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" value={formData.issue} onChange={(e)=>setFormData({...formData,issue:e.target.value})}/>
                <label htmlFor="priority" className="font-bold text-2xl text-slate-900">Priority:</label>
                <select id="priority" className="p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                 value={formData.priority} onChange={(e)=>setFormData({...formData,priority:e.target.value})}>
                    <option value="">Select Priority Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <label htmlFor="description" className="font-bold text-2xl text-slate-900">Description:</label>
                <textarea id="description" className="p-3 border border-slate-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                 value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}></textarea>
                <button className="p-3 bg-cyan-900 text-slate-100 font-bold rounded-md hover:bg-cyan-700" onClick={handleSubmit}>Create Ticket</button>
            </form>
        </div>
    </div>
  )
}
