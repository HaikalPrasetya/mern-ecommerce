import express from "express";
import {
  register,
  login,
  me,
  removeProductsFromCart,
  updateQty,
  logout,
  addAndRemoveWishList,
  wishListCollections,
  notifications,
  updateUser,
} from "../controllers/user.controller.js";
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

router.get("/me", verifyToken, me);
router.post("/register", register);
router.get("/wishlistCollections", verifyToken, wishListCollections);
router.get("/notifications", verifyToken, notifications);
router.post(
  "/update-user",
  verifyToken,
  upload.single("imageFile"),
  updateUser
);
router.post("/login", login);
router.post("/logout", logout);
router.post("/remove-products/:id", verifyToken, removeProductsFromCart);
router.post("/update-qty/:id", verifyToken, updateQty);
router.post(
  "/wishlist/:id",
  verifyToken,

  addAndRemoveWishList
);

export default router;
