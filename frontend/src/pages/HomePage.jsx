import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { TicketCard } from "../components/TicketCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useTicketStore } from "../store/ticketStore";
export const HomePage = () => {
  const [tickets,setTickets]=useState([]);
  const {isUpdated,setIsUpdated}=useTicketStore();
  useEffect(()=>{
    const fetchTickets=async()=>{
        try {
          const res=await axios.get("/api/tickets/mytickets");
          setTickets(res.data.tickets);
          setIsUpdated(false);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch tickets");
        }
    }
    fetchTickets();
  },[isUpdated,setIsUpdated])

  if(tickets.length===0){
    return (
      <div className="h-screen bg-slate-100">
        <NavBar/>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold text-3xl text-cyan-900 mt-5 p-2">My Tickets</h1>
          <div className="max-w-6xl mx-auto mt-4 flex items-center justify-center">
            <h1 className="font-bold text-4xl text-slate-900 mt-10 p-2 py-8">No Tickets Found</h1>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="h-screen bg-slate-100">
      <NavBar/>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl text-cyan-900 mt-5 p-2">My Tickets</h1>
        <div className="max-w-6xl mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket,index)=>(<TicketCard key={index} ticket={ticket}/>))}
        </div>
      </div>
  </div>
  )
}

