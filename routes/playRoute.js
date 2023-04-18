import express from "express";
import {
  getPlays,
  createPlays,
  getPlay,
  updatePlay,
  deletePlay,
} from "../controllers/playsController.js";

const router = express.Router();
router.route("/").get(getPlays).post(createPlays);
router.route("/:gamePin").get(getPlay).put(updatePlay).delete(deletePlay);

export default router;
