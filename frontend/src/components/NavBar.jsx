import { Link } from "react-router-dom"
import {LogOut} from 'lucide-react'
import { useAuthStore } from "../store/authStore"
export const NavBar = () => {
  const {user,logout}=useAuthStore();
  return (

    <div className="p-5 mx-auto max-w-6xl flex items-center justify-between bg-slate-100 text-slate-900">
        <h1 className="font-bold text-3xl text-cyan-900">Ticket</h1>
        <nav className="flex items-center gap-8 font-bold">
            <Link to={'/'} className="hover:underline hover:text-slate-600">Home</Link>
            <Link to={'/create'} className="hover:underline hover:text-slate-600">CreateTicket</Link>
            <div className="flex items-center gap-2">
            <LogOut className="size-8 cursor-pointer" onClick={()=>logout()}/>
            <div className="size-10 rounded-full bg-red-800
             text-slate-300 font-bold text-xl flex items-center justify-center capitalize">{user.name[0]}</div>
            </div>
        </nav>
    </div>
  )
}
