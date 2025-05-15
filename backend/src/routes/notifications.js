import express from "express";
import { verifyToken } from "../utils/jwt.js";
import { getNotifications } from "../controllers/notification_controllers.js";

const notificationRouter = express.Router();

notificationRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { notification_details, receivers } = req.body;

    const users = [];

    const notifications = users.map((user) => ({
      user_id: user.id,
      ...notification_details,
      is_read: false,
    }));

    await bulkCreate(notifications);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

notificationRouter.get(
  "/",
  verifyToken,
  getNotifications
  //   async (req, res) => {
  //   try {
  //     const notifications = await Notifications.findAll({
  //       where: {
  //         for_user: req.user.id,
  //       },
  //       order: [["date", "DESC"]],
  //     });
  //     res.status(200).json(notifications);
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).json({ message: error.message });
  //   }
  // }
);

export default notificationRouter;
