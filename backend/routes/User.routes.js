import express from "express";
import {
  getAllUsers,
  login,
  signUp,
} from "../controllers/Users.controllers.js";

import { verifyToken } from "../middlewares/Token.js";

const userRouter = express.Router();

userRouter.post("/registration/sign-up", signUp);
userRouter.post("/login", login);
userRouter.get("/get-users", verifyToken, getAllUsers);

export default userRouter;
