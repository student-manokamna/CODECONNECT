const mongoose = require('mongoose')
const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/devTinder";
    await mongoose.connect(uri);
}
module.exports = connectDB
