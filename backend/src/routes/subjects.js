import express from "express";
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjects,
  updateSubject,
} from "../controllers/subject_controller.js";

const subjectsRouter = express.Router();

subjectsRouter.post("/", createSubject);
subjectsRouter.get("/", getSubjects);
subjectsRouter.get("/:subjectId", getSubjectById);
subjectsRouter.patch("/:subjectId", updateSubject);
subjectsRouter.delete("/:subjectId", deleteSubject);

export default subjectsRouter;
