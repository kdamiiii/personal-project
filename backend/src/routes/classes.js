import express from "express";
import {
  createClass,
  getClassById,
  getClasses,
  updateClassById,
} from "../controllers/classes_controller.js";

const classesRouter = express.Router();

classesRouter.get("/", getClasses);
classesRouter.get("/:classId", getClassById);
classesRouter.patch("/:classId", updateClassById);
classesRouter.post("/", createClass);

export default classesRouter;
