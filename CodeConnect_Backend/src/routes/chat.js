const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Message = require("../models/message");
const ConnectionRequest = require("../models/connectionRequest");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { targetUserId } = req.params;

        // Verify if they are connected
        const connection = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
                { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
            ],
        });

        if (!connection) {
            return res.status(403).json({ message: "You can only chat with accepted connections." });
        }

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: userId },
            ],
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

chatRouter.delete("/chat/clear/:targetUserId", userAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const { targetUserId } = req.params;

        await Message.deleteMany({
            $or: [
                { senderId: userId, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: userId },
            ],
        });

        res.json({ message: "Chat cleared successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = chatRouter;
