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
    } = req.body;

    const subject = await Subject.create({
      subject_code,
      subject_name,
      subject_description,
      units,
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

export default subjectsRouter;
