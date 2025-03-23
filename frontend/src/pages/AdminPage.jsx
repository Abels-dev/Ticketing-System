import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import {toast} from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export const AdminPage = () => {
   const [userTickets,setUserTickets] = useState([]);
   useEffect(()=>{
        const getAllTickets=async()=>{
             try {
                 const res=await axios.get("/api/tickets");
                 console.log(res.data)
                 setUserTickets(res.data.tickets);
             } catch (error) {
               console.log("Error in getTicketDetail", error.message);
               toast.error(
                  error.response.data.message ||
                     "An error occurred. Please try again."
               );
              
             }
        }
        getAllTickets();
   },[])

   if(userTickets.length===0){
      return (
          <div>
            <NavBar/>
            <h1 className="text-2xl text-center mt-5">No tickets found</h1>
          </div>
       )
   }
   return (
      <div className="h-screen bg-slate-100">
         <NavBar />
         <div className="p-5 mx-auto max-w-6xl">
            <h1 className="font-bold text-3xl text-cyan-900 text-center mt-3">
               Admin Dashboard
            </h1>
            <div className="flex flex-col bg-white rounded-lg shadow-lg mt-5 gap-2 p-4">
               {userTickets.map((ticket)=>{
                const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                    );
                return (<div className="flex items-center justify-between p-2 border-b-2 border-b-slate-400">
                  <Link to={`/details/${ticket._id}`} > 
                    <h1 className="font-bold text-lg text-slate-900 hover:underline">{ticket.issue}</h1>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className={`${ticket.status === "Resolved" ? "text-green-600"
                      : "text-cyan-950"} font-bold text-lg`}>{ticket.status}
                    </span>{" "} |{" "} 
                    <span className={`font-bold capitalize  
                      ${ticket.priority === "low"? "text-green-700":ticket.priority === "medium"
                        ? "text-yellow-500": "text-red-600"}`}>{ticket.priority} priority
                        </span>{" "}|{" "} 
                    <span className="text-sm capitalize font-bold">
                      {formattedDate}
                    </span>
                  </div>
               </div>)
               })}
            </div>
         </div>
      </div>
   );
};
