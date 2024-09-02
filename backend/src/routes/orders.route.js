import express from "express";
import {
  getOrdersDetails,
  updateOrderStatus,
  getMyOrdersDetails,
  completeOrderStatus,
} from "../controllers/orders.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getOrdersDetails);
router.get("/my-orders", verifyToken, getMyOrdersDetails);
router.post("/update-status-order/:id", updateOrderStatus);
router.post("/complete-order/:id", verifyToken, completeOrderStatus);

export default router;
