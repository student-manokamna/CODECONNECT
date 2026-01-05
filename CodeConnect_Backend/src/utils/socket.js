const socket = require("socket.io");
const Message = require("../models/message");

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);

        // Join a private room for the user
        socket.on("joinChat", ({ userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join("_");
            socket.join(roomId);
            console.log(`${socket.id} joined room: ${roomId}`);
        });

        socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
            try {
                const roomId = [senderId, receiverId].sort().join("_");

                // Save message to database
                const newMessage = new Message({
                    senderId,
                    receiverId,
                    message,
                });
                await newMessage.save();

                // Emit to the room (excluding sender)
                socket.to(roomId).emit("messageReceived", newMessage);
            } catch (err) {
                console.error("Error sending message:", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected: " + socket.id);
        });
    });
};

module.exports = initializeSocket;
