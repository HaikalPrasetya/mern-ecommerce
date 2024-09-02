import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePicUrlBasedOnGender;
    if (gender === "Laki-laki") {
      profilePicUrlBasedOnGender = `https://avatar.iran.liara.run/public/boy?username=${firstName}`;
    } else {
      profilePicUrlBasedOnGender = `https://avatar.iran.liara.run/public/girl?username=${firstName}`;
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrlBasedOnGender,
    });
    await user.save();
    generateToken(user._id, res);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate({
    path: "cart.product",
    ref: "Product",
  });
  res.status(200).json(user);
};

export const logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logout successful" });
};

export const removeProductsFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart.filter((item) => {
      return item.product.toString() !== req.params.id;
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateQty = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = user.cart.map((item) => {
      if (item.product.toString() === req.params.id.toString()) {
        return { ...item, quantity: req.body.quantity };
      } else {
        return item;
      }
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addAndRemoveWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isCart = user.wishlist.some(
      (pId) => pId.toString() === id.toString()
    );
    if (isCart) {
      // remove from wishlist
      user.wishlist = user.wishlist.filter((pId) => pId.toString() !== id);
    } else {
      // add to wishlist
      user.wishlist.push(id);
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const wishListCollections = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const sortOptions = {};

    const queryParams = req.query.sortOptions;

    if (queryParams) {
      switch (queryParams) {
        case "priceLowToHigh":
          sortOptions.price = 1;
          break;
        case "priceHighToLow":
          sortOptions.price = -1;
          break;
      }
    }
    console.log(sortOptions);
    const products = await Product.find({
      _id: { $in: user.wishlist },
    }).sort(sortOptions);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const notifications = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const notifications = await Message.find({
      _id: { $in: user.inbox },
    });
    const filteredNotifications = notifications.filter(
      (notification) => notification.replies.message
    );
    res.status(200).json(filteredNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newUpdateData = req.body || user;
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      newUpdateData,
      {
        new: true,
      }
    );
    if (req.file) {
      const image = req.file;
      const b64 = Buffer.from(image.buffer).toString("base64");
      const path = `data:${image.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(path);
      updatedUser.profilePic = result.secure_url;
    }
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
