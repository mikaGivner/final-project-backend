import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import newPlay from "./routes/playRoute.js";
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/api/v1/newPlay", newPlay);
if (process.env.NODE_ENV !== `production`) {
  app.use(morgan(`dev`));
}

app.get("/", (req, res) =>
  res.status(200).json({ message: "server is running now" })
);
const buildServer = http.createServer(app);

const io = new Server(buildServer, {
  cors: {
    origin: "songs-gusser.netlify.app",
    methods: ["GET", "POST", "PUT"],
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

  socket.on("leave_room", async (name) => {
    const game = await importPlays.findOne({ gamePin: req.params.gamePin });
    // Remove the participant's name from the list of participants
    const updatedParticipants = game.participants.filter(
      (participant) => participant !== name
    );
    // Update the game data in the database
    await importPlays.findOneAndUpdate(
      { gamePin: req.params.gamePin },
      { participants: updatedParticipants }
    );
    // Emit an event to all clients in the room indicating that a participant has left
    io.to(pin).emit("participant_left", name);
  });
});

const PORT = process.env.PORT || 1000;
buildServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
