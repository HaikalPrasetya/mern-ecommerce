import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  getLatestProducts,
  getPopularProducts,
  getProductMens,
  addToCart,
  getProductsInMyCart,
  handlePaymentIntent,
  confirmationPaymentInCart,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

router.get("/", getAllProducts);
router.get("/latest", getLatestProducts);
router.get("/popular", getPopularProducts);
router.get("/mens", getProductMens);
router.get("/myCart", verifyToken, getProductsInMyCart);
router.get("/:id", getProductById);
router.post("/add", upload.array("imageFiles", 6), addProduct);
router.patch("/update/:id", upload.array("imageFiles", 6), updateProduct);
router.post("/addToCart/:id", verifyToken, addToCart);
router.post("/order/payment-intent", verifyToken, handlePaymentIntent);
router.post("/confirmationPayment", verifyToken, confirmationPaymentInCart);
router.delete("/delete/:id", deleteProduct);

export default router;
