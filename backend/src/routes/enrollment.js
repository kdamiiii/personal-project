import express from "express";
import {
  EnrollmentDetails,
  ParentsDetails,
  SchoolsDetails,
  EnrollmentRequirements,
  EnrollmentCourse,
} from "../models/index.js";

const enrollmentRouter = express.Router();

enrollmentRouter.post("/", async (req, res) => {
  try {
    const {
      enrollment_details,
      parents_details,
      educational_background,
      course_id,
    } = req.body;

    const enrollmentDetails = await EnrollmentDetails.create({
      ...enrollment_details,
    });

    await ParentsDetails.create({
      ...parents_details,
      enrollment_id: enrollmentDetails.id,
    });

    await SchoolsDetails.create({
      ...educational_background,
      enrollment_id: enrollmentDetails.id,
    });

    await EnrollmentRequirements.create({
      enrollment_id: enrollmentDetails.id,
    });

    await EnrollmentCourse.create({
      enrollment_details_id: enrollmentDetails.id,
      selected_course: course_id,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/", async (req, res) => {
  try {
    const enrollmentDetails = await EnrollmentDetails.findAll({
      include: [
        {
          model: ParentsDetails,
          as: "Parent_Details",
        },
        {
          model: SchoolsDetails,
          as: "Schools_Details",
        },
        {
          model: EnrollmentRequirements,
          as: "Enrollment_Requirements",
        },
      ],
    });
    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/:enrollmentId", async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollmentDetails = await EnrollmentDetails.findByPk(enrollmentId);

    if (!enrollmentDetails) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export default enrollmentRouter;
