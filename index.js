const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth")
const messageRoutes = require("./routes/messages")
const conRoutes = require("./routes/conn")

const cors = require("cors");

dotenv.config();

const connectDatabase = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log("connected")
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
};
connectDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)
app.use("/api/cons", conRoutes)
 
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});