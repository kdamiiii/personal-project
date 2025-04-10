import express from "express";
import { Course, User } from "../models/index.js";
import { verifyToken } from "../utils/jwt.js";

const courseRouter = express.Router();

courseRouter.get("/", async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          attributes: ["first_name", "last_name"],
        },
      ],
    });

    res.status(200).json(courses);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

courseRouter.get("/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const courses = await Course.findOne({
      include: [
        {
          model: User,
        },
      ],
      where: {
        id: courseId,
      },
      logging: console.log,
    });

    console.log(courses);

    res.status(200).json(courses);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

courseRouter.post("/", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    const { course_name, course_type, course_code, course_description } =
      req.body;
    const course = Course.create({
      course_name,
      course_type,
      course_code,
      course_description,
      userId: user.id,
    });

    console.log(user);

    res.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default courseRouter;
