import express from "express";
import {
  edit,
  remove,
  logout,
  see,
  startGihubLogin,
  finishGihubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/github/start", startGihubLogin);
userRouter.get("/github/finish", finishGihubLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
