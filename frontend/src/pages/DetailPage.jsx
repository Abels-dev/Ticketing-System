import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { NavBar } from "../components/NavBar";

export const DetailPage = () => {
   const navigate=useNavigate();
   const { id } = useParams();
   const [ticketDetail, setTicketDetail] = useState({});

   const handleDelete=async()=>{
         try {
             await axios.delete(`/api/tickets/${id}`);
             navigate("/");
         } catch (error) {
             console.log(error.message);
         }
   }

   useEffect(() => {
      const getTicketDetail = async () => {
         try {
            const response = await axios.get("/api/tickets/" + id);
            setTicketDetail(response.data.ticket);
         } catch (error) {
            console.log("Error in getTicketDetail", error.message);
            toast.error(
               error.response.data.message ||
                  "An error occurred. Please try again."
            );
         }
      };
      getTicketDetail();
   }, [id]);
   const formattedDate = new Date(ticketDetail.createdAt).toLocaleDateString(
      "en-US",
      {
         year: "numeric",
         month: "long",
         day: "numeric",
      }
   );
   return (
      <div className="h-screen bg-slate-100">
         <NavBar />
         <div className="max-w-6xl mx-auto mt-16">
            <div className="flex justify-between items-center mt-5">
               <h1 className="font-bold text-3xl text-slate-900  p-2 capitalize">
                  {ticketDetail.issue}
               </h1>
               <button className="flex items-center justify-center gap-2 font-bold text-lg
                text-slate-200 p-2 px-4 rounded-md mr-3 bg-red-600 hover:bg-red-500" onClick={handleDelete}>Delete</button>
            </div>
            <div className="pl-3">
               <span
                  className={`${
                     ticketDetail.status === "Resolved"
                        ? "text-green-600"
                        : "text-cyan-950"
                  } font-bold text-lg`}>
                  {ticketDetail.status}
               </span>{" "}
               |{" "}
               <span
                  className={`font-bold capitalize  ${
                     ticketDetail.priority === "low"
                        ? "text-green-700"
                        : ticketDetail.priority === "medium"
                        ? "text-yellow-500"
                        : "text-red-600"
                  }`}>
                  {ticketDetail.priority} priority
               </span>{" "}
               |{" "}
               <span className="text-sm capitalize font-bold">
                  {formattedDate}
               </span>
            </div>
            <p className="text-lg mt-8 p-2 text-slate-800">
               {ticketDetail.description}
            </p>
         </div>
      </div>
   );
};
