import { Router } from "express";
import { ModelController } from "../controllers/userController.js";

export const createRouter = ({ userModel }) => {
  const userRouter = Router();

  const userController = new ModelController({ userModel });

  userRouter.get("/", userController.getUsers);
  userRouter.get("/:id", userController.getUser);
  userRouter.get("/name/:firstName", userController.getUserName);

  userRouter.post("/", userController.postUser);
  userRouter.delete("/:id", userController.deleteUser);
  userRouter.patch("/:id", userController.patchUser);

  return userRouter;
};
