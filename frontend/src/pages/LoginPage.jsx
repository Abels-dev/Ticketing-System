import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/authStore"
export const LoginPage = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const {login}=useAuthStore();
  const handleLogin=(e)=>{
      e.preventDefault()
      login(formData)
  }
  return (
    <div className="flex min-h-screen bg-slate-300">
       <div className="min-h-full w-2/5 ">
          <img src="image_fx_.jpg" alt="heroimage" className="min-h-full w-full  object-cover object-center"/>
       </div>
       <div className="min-h-full flex flex-col flex-1 items-center justify-center">
          <h1 className="font-bold text-cyan-950 text-4xl mb-12">Login Here</h1>
          <form className="p-8 w0 w-[500px] flex flex-col gap-4 rounded bg-slate-50">
            <label htmlFor="email" className="text-xl font-bold text-cyan-900">Email : </label>
            <input type="email" placeholder="Johndoe@xyz.com" className="p-3 rounded-lg outline-none bg-slate-200" 
                 value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
            <label htmlFor="password" className="text-xl font-bold text-cyan-900">Password</label>
            <input type="password" placeholder="**********" className="p-3 rounded-lg outline-none bg-slate-200"
                value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}/>
            <button className="p-3 bg-cyan-900 text-slate-200 rounded mt-6" onClick={handleLogin}>Login</button>
             <p className="text-cyan-950">Don't have an account? <Link to="/signup">Signup</Link></p>
          </form>
       </div>
    </div>
  )
}
