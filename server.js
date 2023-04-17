import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import axios from "axios";
import http from "http";
import { Server } from "socket.io";
import newPlay from "./routes/playRoute.js";
import newUser from "./routes/userRoute.js";
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/v1/newPlay", newPlay);
app.use("/api/v1/newUser", newUser);
if (process.env.NODE_ENV !== `production`) {
  app.use(morgan(`dev`));
}

app.get("/", (req, res) =>
  res.status(200).json({ message: "server is running now" })
);
let connectParticipants = [];
let roomNum = "";
const buildServer = http.createServer(app);

const io = new Server(buildServer, {
  cors: {
    origin: "songs-gusser.netlify.app",
    methods: ["GET", "POST"],
  },
  pingTimeout: 160000000,
});

io.on("connection", (socket) => {
  console.log(`UserConnected:${socket.id}`);

  socket.on("join_room", (newPin, newName) => {
    socket.join(newPin);
  });
  socket.on("game_started", (newPin) => {
    console.log("newPin", newPin);
    io.to(newPin).emit("game_started", { message: true });
    callback(null, { message: "Game started successfully!" });
  });

  socket.on("add_participant", (newName, newPin, admin, yourAdmin) => {
    connectParticipants.push({
      name: newName,
      id: socket.id,
      room: newPin,
      isAdmin: admin,
      userAdmin: yourAdmin,
    });
    roomNum = newPin;

    io.to(newPin).emit("participant_added", connectParticipants);
  });
  socket.on("disconnect", async () => {
    console.log(`User disconnected:${socket.id}`);
    connectParticipants = connectParticipants.filter((theName) => {
      return theName.id !== socket.id;
    });

    io.to(roomNum).emit("participant_added", connectParticipants);
  });
});
const PORT = process.env.PORT || 1000;

buildServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
