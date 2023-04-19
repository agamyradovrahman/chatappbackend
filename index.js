const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const conRoutes = require("./routes/conn");
const imgRoutes = require("./routes/image")
const cookieParser = require("cookie-parser");
const socket = require("socket.io");

const cors = require("cors");
const corsOptions = require("./config/corsOption");
const credentials = require("./middleware/credentials");

dotenv.config();

const mongourl = process.env.MONGO_URL

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect("mongodb+srv://rahman1205:rahman1205@rahman1205.xfhlxmk.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDatabase();

app.use(credentials)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/msg", messageRoutes);
app.use("/api/cons", conRoutes);
app.use("/api/upload", imgRoutes); 


const server = app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("sokecket added");
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
    console.log("sokecket recieve");
  });
});
