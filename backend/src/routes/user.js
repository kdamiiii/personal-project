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

userRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      include: [
        {
          model: Credential,
          attributes: ["username"],
          where: {
            username: userId,
          },
        },
        {
          model: UserRole,
          attributes: ["role"],
          include: [{ model: Role, attributes: ["role"] }],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
