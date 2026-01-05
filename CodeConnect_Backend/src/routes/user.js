const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const USER_SAFE_DATA = " firstName lastName photoUrl age gender about skills"
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName"); //second parametr nhi to sari information de ddga
        // populate("fromUserId",["firstName","lastName"]); agar string me de rhe ho to beech me space do
        res.json({
            message: "data fetched successfully",
            data: connectionRequest,
        })
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})
userRouter.get("/user/requests/send", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            fromUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName"); //second parametr nhi to sari information de ddga
        // populate("fromUserId",["firstName","lastName"]); agar string me de rhe ho to beech me space do
        res.json({
            message: "data fetched successfully",
            data: connectionRequest,
        })
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {
                    toUserId: loggedInUser._id,
                    status: "accepted"
                },
                {
                    fromUserId: loggedInUser._id,
                    status: "accepted"
                }
            ]

        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);//second parametr nhi to sari information de ddga
        // populate("fromUserId",["firstName","lastName"]);
        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
                return row.toUserId // jisse mene beji hh ye vo case hh 
            }
            return row.fromUserId
        })
        res.json({
            data
        })
    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})
userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id },
                { fromUserId: loggedInUser._id }
            ],
        }).select("fromUserId toUserId")
        // .populate("fromUserId","firstName")
        const hideUser = new Set();
        connectionRequest.forEach(peo => {
            hideUser.add(peo.fromUserId.toString())
            hideUser.add(peo.toUserId.toString())

        })
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUser) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA)
        res.send(users)

    }
    catch (err) {
        res.status(400).send("Error: " + err.message)
    }
})

userRouter.get("/user/:userId", userAuth, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select(USER_SAFE_DATA);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = userRouter;