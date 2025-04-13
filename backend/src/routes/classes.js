import express from "express";
import { User, Subject, Classes } from "../models/index.js";

const classesRouter = express.Router();

classesRouter.get("/", async (req, res) => {
  try {
    const classes = await Classes.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Subject,
          attributes: ["id", "subject_name", "subject_code", "units"],
        },
      ],
    });

    res.status(200).json(classes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

classesRouter.get("/:classId", async (req, res) => {
  try {
    const { classId } = req.params;
    const subjectClass = await Classes.findOne({
      include: [
        {
          model: User,
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Subject,
          attributes: ["id", "subject_name", "subject_code", "units"],
        },
      ],
      where: {
        id: classId,
      },
    });
    res.status(200).json(subjectClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

classesRouter.post("/", async (req, res) => {
  try {
    const {
      class_code,
      class_subject,
      class_instructor,
      schedule,
      time_start,
      time_end,
      room,
    } = req.body;
    const subjectClass = await Classes.create({
      class_code,
      class_subject,
      class_instructor: class_instructor,
      schedule,
      time_start,
      time_end,
      room,
    });

    res.status(200).json(subjectClass);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default classesRouter;
