import express from "express";

const router = express.Router();

const users = [
  {
    username: "kdamiiii",
    password: "123123",
  },
];

router.get("/info", (req, res) => {
  res.send({ message: "Not logged in" });
});

router.post("/login", (req, res) => {
  const credentials = req.body;
  const user = users.find(
    (u) =>
      u.username == credentials.username && u.password == credentials.password
  );

  res.send({ success: !!user });
});

export default router;
