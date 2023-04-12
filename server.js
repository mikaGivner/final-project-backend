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
let arr = [];

const buildServer = http.createServer(app);

const io = new Server(buildServer, {
  cors: {
    origin: "songs-gusser.netlify.app",
    methods: ["GET", "POST", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`UserConnected:${socket.id}`);

  socket.on("join_room", (newPin) => {
    socket.join(newPin);
  });

  socket.on("add_participant", (newName, newPin) => {
    arr.push({ name: newName, id: socket.id });

    io.to(newPin).emit("participant_added", arr);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected:${socket.id}`);

    // const index = arr.indexOf(newName);
    // if (index > -1) {
    //   arr.splice(index, 1);
    // }
    arr = arr.filter((theName) => {
      theName.id !== socket.id;
    });
    //io.to(newPin).emit("participant_added", arr);
    socket.emit("participant_added", arr);
  });
  //   // arr = arr.filter((player) => player.id !== socket.id);
  //   io.emit("participant_added", arr);
  // });
  // socket.off("add_participant", (newName, newPin) => {
  //   const index = arr.indexOf(newName);
  //   if (index > -1) {
  //     arr.splice(index, 1);
  //   }
  // });
});
const PORT = process.env.PORT || 1000;
buildServer.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
