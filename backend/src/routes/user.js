import express from "express";
import {
  createUser,
  getUsers,
  getRoles,
  createRole,
  addRoleToUser,
  getUserByUsername,
} from "../controllers/users_controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/roles", getRoles);
userRouter.post("/", createUser);
userRouter.post("/roles", createRole);
userRouter.post("/:userId/role", addRoleToUser);
userRouter.get("/:userId", getUserByUsername);

export default userRouter;
