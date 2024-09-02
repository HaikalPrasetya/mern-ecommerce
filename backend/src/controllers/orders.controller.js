import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const getOrdersDetails = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server errror!" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getMyOrdersDetails = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const orders = await Order.find({
      _id: { $in: user.orders },
    }).populate({
      path: "product",
      ref: "Product",
    });
    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const completeOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    order.status = "selesai";
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
