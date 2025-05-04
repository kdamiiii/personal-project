import express from "express";
import { verifyToken } from "../utils/jwt.js";
import {
  getCourses,
  getCourseById,
  createCourse,
  getCourseSubjects,
  addSubjectToCourse,
  removeSubjectFromCourse,
} from "../controllers/courses_controller.js";

const courseRouter = express.Router();

courseRouter.get("/", getCourses);
courseRouter.get("/:courseId", getCourseById);
courseRouter.post("/", verifyToken, createCourse);
courseRouter.get("/:courseId/subjects", getCourseSubjects);
courseRouter.post("/:courseId/subjects", addSubjectToCourse);
courseRouter.delete("/:courseId/subjects/:subjectId", removeSubjectFromCourse);

export default courseRouter;
