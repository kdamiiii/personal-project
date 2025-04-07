import express from "express";
import { Credential, User, Role, UserRole } from "../models/index.js";
import { assignRole } from "../utils/roles_manager.js";

export const userRouter = express.Router();

/* THIS ROUTE SHOULD BE REMOVED ONCE ALL ROLES HAVE BEEN FILLED */
userRouter.post("/roles", async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await Role.create({ role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/:userId/role", async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;
    const userRole = await assignRole(userId, role);
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
