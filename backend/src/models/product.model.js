import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    subCategory: {
      type: String,
      enum: ["Topwear", "Bottomwear", "Winterwear"],
      required: true,
    },
    price: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      required: true,
    },
    sold: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
