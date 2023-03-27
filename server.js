import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

dotenv.config({ path: "./config/config.env" });
const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== `production`) {
  app.use(morgan(`dev`));
}
const buildServer = http.createServer(app);

const io = new Server(buildServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`UserConnected:${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("add_participant", (data) => {
    socket.broadcast.emit("participant_added", data);
  });
});

const PORT = process.env.PORT || 5000;
buildServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
