import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    status: {
      type: String,
      enum: ["dikemas", "dikirim", "selesai"],
      default: "dikemas",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
