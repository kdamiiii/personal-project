import express from "express";
import { Credential, User, Role, UserRole } from "../models/index.js";
import { assignRole } from "../utils/roles_manager.js";

const userRouter = express.Router();
const DEFAULT_PASSWORD = "password12345";
/* THIS ROUTE SHOULD BE REMOVED ONCE ALL ROLES HAVE BEEN FILLED */
userRouter.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const user = await User.create({
      first_name,
      last_name,
      email,
    });
    const credential = await Credential.create({
      username: `${first_name}.${last_name}`,
      password: DEFAULT_PASSWORD,
      userId: user.id,
    });

    console.log(credential);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/roles", async (req, res) => {
  try {
    const { role } = req.body;
    const user = await Role.create({ role });
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/:userId/role", async (req, res) => {
  try {
    const { role } = req.body;
    const { userId } = req.params;
    console.log(role, userId);
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
      throw new Error("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Credential,
          attributes: ["username"],
        },
        {
          model: UserRole,
          attributes: ["role"],
          include: [{ model: Role, attributes: ["role"] }],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
