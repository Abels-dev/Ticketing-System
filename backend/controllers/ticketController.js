import Ticket from "../models/Ticket.js";

export const getAllTickets = async (req, res) => {
   try {
       const tickets=await Ticket.find({});
       res.status(200).json({success:true,tickets});
   } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
      console.log("Error in getAllTickets controller", error);
   }
};

export const createTicket = async (req, res) => {
      try {
            const { issue, description, priority } = req.body;
            const ticket = new Ticket({
                issue,
                description,
                priority,
                user: req.user._id,
            });
            const createdTicket = await ticket.save();
            res.status(201).json({ success: true, ticket: createdTicket });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error in createTicket controller", error);
      }
}

export const getMyTickets = async (req, res) => {
      try {
          const tickets = await Ticket.find({ user: req.user._id });
          res.status(200).json({ success: true, tickets });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error in getMyTickets controller", error);
      }
}

export const getTicketById = async (req, res) => {
      try {
          const ticket = await Ticket.findById(req.params.id);
          if (!ticket) {
              return res.status(404).json({ success: false, message: "Ticket not found" });
          }
          res.status(200).json({ success: true, ticket });
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error in getTicketById controller", error);
      }
}

export const updateStatus = async (req, res) => {
    try {
        const {id}=req.params;
        const {status}=req.body;
        const ticket=await Ticket.findById(id);
        if(!ticket){
            return res.status(404).json({success:false,message:"Ticket not found"});
        }
        ticket.status=status;
        await ticket.save();
        res.status(200).json({success:true,ticket});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error in updateStatus controller", error); 
    }
}

export const deleteTicket = async (req, res) => {
    try {
        const {id}=req.params;
        const ticket=await Ticket.findById(id).populate("user","_id");
        if(!ticket){
            return res.status(404).json({success:false,message:"Ticket not found"});
        }
        if(ticket.user._id.toString()!==req.user._id.toString()){
            return res.status(401).json({success:false,message:"You are not authorized to delete this ticket"});
        }
        req.user.ticket.pull(ticket._id);
        await req.user.save();
        await ticket.deleteOne();
        res.status(200).json({success:true,message:"Ticket deleted successfully"});
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error in deleteTicket controller", error); 
    }
}