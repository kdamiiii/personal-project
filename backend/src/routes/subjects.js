import express from "express";
import { Subject } from "../models/index.js";

const subjectsRouter = express.Router();

subjectsRouter.post("/", async (req, res) => {
  try {
    const {
      subject_code,
      subject_name,
      units,
      prerequisite,
      subject_description,
      price,
    } = req.body;

    const subject = await Subject.create({
      subject_code,
      subject_name,
      subject_description,
      units,
      price,
      prerequisite: prerequisite || null,
    });

    console.log(subject);

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

subjectsRouter.get("/", async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).json(subjects);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

subjectsRouter.get("/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findByPk(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

subjectsRouter.delete("/:subjectId", async (req, res) => {
  try {
    const { subjectId } = req.params;
    await Subject.destroy({
      where: {
        subjectId,
      },
    });

    res.status(200).json({ message: "Course subject deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

export default subjectsRouter;
