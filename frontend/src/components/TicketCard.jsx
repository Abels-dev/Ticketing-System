import React from "react";

export const TicketCard = ({ ticket }) => {
   const formattedDate = new Date(ticket.createdAt).toLocaleDateString(
      "en-US",
      {
         year: "numeric",
         month: "long",
         day: "numeric",
      }
   );
   return (
      <div className="bg-white shadow-lg rounded-lg p-4 text-slate-900 relative flex flex-col justify-between">
         <div className="flex justify-between items-center gap-6">
            <h2 className="text-xl font-bold">{ticket.issue}</h2>
            <p
               className={`font-bold capitalize  ${
                  ticket.priority === "low"
                     ? "text-green-700"
                     : ticket.priority === "medium"
                     ? "text-yellow-500"
                     : "text-red-600"
               }`}>
               {ticket.priority}
            </p>
         </div>
         <p className="mt-3">
            {ticket.description?.length > 100
               ? ticket.description?.slice(0, 100) + "..."
               : ticket.description}
         </p>
         <div className="mt-3 flex justify-between items-center gap-2">
            <p
               className={
                  ticket.status === "Resolved"
                     ? "text-green-600"
                     : "text-cyan-900"
               }>
               {ticket.status}
            </p>
            <div className="text-sm text-slate-600 text-right">
               {formattedDate}
            </div>
         </div>
      </div>
   );
};
