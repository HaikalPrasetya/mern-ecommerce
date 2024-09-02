import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import adminRoutes from "./routes/admin.route.js";
import productRoutes from "./routes/products.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/messages.route.js";
import orderRoutes from "./routes/orders.route.js";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Listening on port ${PORT}`);
});
