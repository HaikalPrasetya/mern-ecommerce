import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: { type: String, required: true },
    replies: {
      message: {
        type: String,
        default: "",
      },
      sender: {
        type: String,
        default: "",
      },
      createdAt: { type: Date, default: Date.now },
    },

    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
