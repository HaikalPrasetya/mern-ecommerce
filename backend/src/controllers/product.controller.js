import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { v2 as cloudinary } from "cloudinary";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const addProduct = async (req, res) => {
  try {
    const body = req.body;
    const imageFiles = req.files;
    const resultUrls = await uploadImages(imageFiles);
    body.imageUrls = resultUrls;
    const product = new Product({
      ...body,
    });
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const body = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });

    const files = req.files;
    if (files) {
      const resultUrls = await uploadImages(files);
      product.imageUrls = [...product.imageUrls, ...resultUrls];
    }

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(7);
    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find({
      sold: { $gt: 0 },
    }).limit(4);
    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const filteredProducts = (queryParams) => {
  const filtered = {};
  if (queryParams.category) {
    filtered.category = queryParams.category;
  }
  if (queryParams.sizes) {
    filtered.sizes = {
      $all: Array.isArray(queryParams.sizes)
        ? queryParams.sizes
        : [queryParams.sizes],
    };
  }
  if (queryParams.price) {
    filtered.price = {
      $lte: Number(queryParams.price),
    };
  }
  return filtered;
};

export const getProductMens = async (req, res) => {
  try {
    const filteringOptions = filteredProducts(req.query);
    const increaseDisplayingProducts = req.query.increaseCard;

    const toBool = increaseDisplayingProducts === "true" ? true : false;

    let limitProduct = 12;

    if (!toBool) {
      limitProduct = 12;
    } else {
      limitProduct = 16;
    }

    const sortOption = {};

    if (req.query.sortOptions) {
      switch (req.query.sortOptions) {
        case "priceLowToHigh":
          sortOption.price = 1;
          break;
        case "priceHighToLow":
          sortOption.price = -1;
          break;
      }
    }

    const products = await Product.find(filteringOptions)
      .sort(sortOption)
      .limit(limitProduct);

    const totalDocuments = await Product.countDocuments(filteringOptions);

    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }

    const response = {
      data: products,
      totalDocuments,
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { size } = req.body;
    const user = await User.findOne({
      _id: req.userId,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const alreadyInCart = user.cart.find(
      (pId) => pId.product.toString() === product._id.toString()
    );
    if (!alreadyInCart) {
      // Add product to cart
      user.cart.push({ product: product._id, size });
    } else {
      // Remove product from cart
      user.cart = user.cart.filter(
        (pId) => pId.product.toString() !== product._id.toString()
      );
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProductsInMyCart = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.userId,
    }).populate({
      path: "cart.product",
      ref: "Product",
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let products = await Product.find({
      _id: { $in: user.cart.map((pId) => pId.product) },
    });
    if (!products || products.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const handlePaymentIntent = async (req, res) => {
  try {
    const { productsId, totalPrice } = req.body;
    const totalPriceInCents = Math.round(Number(totalPrice) * 1000);
    console.log(totalPriceInCents);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPriceInCents * 100,
      currency: "idr",
      metadata: {
        products: JSON.stringify(productsId),
        userId: req.userId,
      },
    });
    if (!paymentIntent.client_secret) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost: totalPriceInCents,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const confirmationPaymentInCart = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent || paymentIntent.metadata.userId !== req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: "Payment failed" });
    }

    const user = await User.findById(req.userId).populate("cart.product");
    const orderPromises = user.cart.map(async (obj) => {
      const order = new Order({
        ...req.body,
        userId: req.userId,
        product: obj.product._id,
        quantity: obj.quantity,
      });
      obj.product.sold += obj.quantity;
      user.orders.push(order._id);
      await Promise.all([order.save()]);
    });

    await Promise.all(orderPromises);
    user.cart = [];
    await user.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

async function uploadImages(files) {
  const imageUrls = files.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const path = `data:${image.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(path);
    return result.secure_url;
  });
  const resultUrls = await Promise.all(imageUrls);
  return resultUrls;
}
