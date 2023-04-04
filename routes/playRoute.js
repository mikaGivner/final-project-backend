import express from "express";
import {
  getPlays,
  createPlays,
  getPlay,
} from "../controllers/playsController.js";

const router = express.Router();
router.route("/").get(getPlays).post(createPlays);
router.route("/:gamePin").get(getPlay);

export default router;
