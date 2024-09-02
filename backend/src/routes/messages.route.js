import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  sendMessage,
  getAllMessagesFromUsers,
  getMessagesById,
  repliesMessage,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/", getAllMessagesFromUsers);
router.get("/:id", getMessagesById);
router.post("/send", verifyToken, sendMessage);
router.post("/reply/:id", repliesMessage);

export default router;
