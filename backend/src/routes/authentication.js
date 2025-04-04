import express from "express";
import { generateWebToken, verifyToken } from "../utils/jwt.js";
import { Credential } from "../models/index.js";

const router = express.Router();

router.get("/info", verifyToken, (req, res) => {
  res.send({ message: "You are Logged In", user: req.user });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Credential.findOne({
      where: { username, password },
    });

    if (!user) {
      return res.send(401).json({ message: "Invalid Credentials" });
    }

    const token = generateWebToken(user.dataValues.username);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({ message: "Login successful" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
