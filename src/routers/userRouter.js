import express from "express";
import {
  postEdit,
  getEdit,
  logout,
  see,
  startGihubLogin,
  finishGihubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadFiles,
} from "../middlewares";

const userRouter = express.Router();

userRouter.route("/logout").all(protectorMiddleware).get(logout);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("avatar"), postEdit);
userRouter.route("/github/start").get(publicOnlyMiddleware, startGihubLogin);
userRouter.route("/github/finish").get(publicOnlyMiddleware, finishGihubLogin);
userRouter
  .route("/change-password")
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.route("/:id").get(see);

export default userRouter;
