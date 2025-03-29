import express from "express";
import { generateWebToken, verifyToken } from "../utils/jwt.js";

const router = express.Router();

const users = [
  {
    username: "kdamiiii",
    password: "123123",
  },
];

router.get("/info", verifyToken, (req, res) => {
  res.send({ message: "You are Logged In", user: req.user });
});

router.post("/login", (req, res) => {
  const credentials = req.body;
  const user = users.find(
    (u) =>
      u.username == credentials.username && u.password == credentials.password
  );

  if (!user) {
    return res.send(401).json({ message: "Invalid Credentials" });
  }

  const token = generateWebToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: "Login successful" });
});

export default router;
