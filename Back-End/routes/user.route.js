import express from "express";
import { addNewUser, getOneUser } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const userRouter = express.Router();

userRouter.post("/add", addNewUser);
userRouter.get("/readOne", authenticate, getOneUser);

export { userRouter };
