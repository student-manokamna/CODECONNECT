require('dotenv').config();
const express = require('express');
const connectDB = require("./config/database")
const app = express() //INSANCE OF EXPRESS

const cors = require("cors")

const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}));
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });
// app.options("*", cors());
// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.sendStatus(204); // No content
// });


app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {

    console.log(`Received ${req.method} request at ${req.url}`);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user");
const paymentRouter = require('./routes/payment');
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const http = require("http");
const server = http.createServer(app);
const initializeSocket = require("./utils/socket");
initializeSocket(server);


connectDB().then(() => {
    console.log("database connection successfull")
    server.listen(7777, () => {
        console.log("server is successfully listing on port 7777")
    })
}).catch(err => {
    console.log("database cannot be connected")
}) 