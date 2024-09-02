import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Laki-laki", "Perempuan"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    profilePic: { type: String, default: "" },
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: [] },
    ],
    addressDetails: {
      type: String,
      default: "",
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    wishlist: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
    ],
    inbox: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
