import express from "express";
import {
  getUsers,
  createUser,
  getUser,
} from "../controllers/usersController.js";

const router = express.Router();
router.route("/").get(getUsers).post(createUser);
router.route("/:userName").get(getUser);

export default router;
