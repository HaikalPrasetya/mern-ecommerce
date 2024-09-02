import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const newMessage = new Message({
      sender: req.userId,
      receiver: "admin",
      message,
    });
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.inbox.push(newMessage._id);
    await Promise.all([user.save(), newMessage.save()]);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllMessagesFromUsers = async (req, res) => {
  try {
    const message = await Message.find({
      receiver: "admin",
    }).populate({
      path: "sender",
      ref: "User",
    });
    if (message.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessagesById = async (req, res) => {
  try {
    const messages = await Message.findById(req.params.id);
    if (!messages) {
      return res.status(404).json({ message: "Message not found" });
    }
    messages.isRead = true;
    await messages.save();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const repliesMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    message.replies = {
      message: req.body.message,
      sender: "admin",
      createdAt: new Date(),
    };
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
