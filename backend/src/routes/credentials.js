import express from "express";
import { Credential, User } from "../models/index.js";

export const credentialRouter = express.Router();

credentialRouter.post("/generate", async (req, res) => {
  try {
    const { username, password, userId } = req.body;
    const user = await Credential.create({ username, password, userId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

credentialRouter.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: userId },
      include: [{ model: Credential }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
