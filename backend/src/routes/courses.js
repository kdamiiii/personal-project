import express from "express";
import { Course, CourseSubject, User, Subject } from "../models/index.js";
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
        {
          model: Subject,
          attributes: [
            "id",
            "subject_name",
            "subject_code",
            "units",
            "price",
            "prerequisite",
            "subject_description",
          ],
          through: { attributes: ["student_year", "semester"] },
          as: "CourseSubjects",
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
    const course = await Course.create({
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

courseRouter.get("/:courseId/subjects", async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseSubject = await Course.findOne({
      where: { id: courseId },
      include: {
        model: Subject,
        attributes: ["id", "subject_name", "subject_description", "price"], // Include only the fields you need
        through: { attributes: [] }, // Exclude CourseSubject fields
        as: "CourseSubjects", // Use the alias defined in the model
      },
    });

    console.log(courseSubject);

    res.status(200).json(courseSubject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

courseRouter.post("/:courseId/subjects", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { subjectId, student_year, semester } = req.body;

    const courseSubject = await CourseSubject.create({
      courseId,
      subjectId,
      student_year,
      semester,
    });

    console.log(courseSubject);

    res.status(200).json(courseSubject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

courseRouter.delete("/:courseId/subjects/:subjectId", async (req, res) => {
  try {
    const { courseId, subjectId } = req.params;
    await CourseSubject.destroy({
      where: {
        courseId,
        subjectId,
      },
    });

    res.status(200).json({ message: "Course subject deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default courseRouter;
