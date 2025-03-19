import express from "express";
import { adminRoute, protectRoute } from "../middleware/authMiddleware.js";
import {
   createTicket,
   deleteTicket,
   getAllTickets,
   getMyTickets,
   getTicketById,
   updateStatus,
} from "../controllers/ticketController.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllTickets);
router.post("/", protectRoute, createTicket);
router.get("/mytickets", protectRoute, getMyTickets);
router.get("/:id", protectRoute, getTicketById);
router.put("/:id", protectRoute, adminRoute, updateStatus);
router.delete("/:id", protectRoute, deleteTicket);

export default router;
