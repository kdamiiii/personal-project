import express from "express";
import {
  EnrollmentDetails,
  ParentsDetails,
  SchoolsDetails,
  EnrollmentRequirements,
  EnrollmentCourse,
  Course,
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/", async (req, res) => {
  try {
    const enrollmentDetails = await EnrollmentDetails.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "status",
        "ah_status",
        "finance_status",
      ],
      include: [
        {
          model: Course,
          as: "courses", // Must match the `as` used in the association
          attributes: ["course_name"],
          through: {
            attributes: ["selected_course"], // if you want to include junction data
          },
        },
      ],
    });
    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/request_count", async (req, res) => {
  try {
    const amount = await EnrollmentDetails.count({
      where: {
        ah_status: "PENDING",
      },
      logging: console.log,
    });

    res.status(200).json({ ah_pending: amount });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/:enrollmentId", async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollmentDetails = await EnrollmentDetails.findOne({
      where: { id: enrollmentId },
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
        {
          model: Course,
          as: "courses",
        },
      ],
    });

    if (!enrollmentDetails) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.patch("/:enrollmentId", async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { modifier, status } = req.body;
    console.log("PATCHING PATCHING PATCHING", [modifier, status]);
    const enrollmentDetails = await EnrollmentDetails.findByPk(enrollmentId);

    if (!enrollmentDetails) {
      return res.status(404).json({ message: "Enrollment request not found" });
    }

    enrollmentDetails.set({
      [modifier]: status,
    });

    await enrollmentDetails.save();

    res.status(200).json(enrollmentDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

enrollmentRouter.get("/:enrollmentId/subjects", async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollmentDetails = await EnrollmentDetails.findOne({
      where: { id: enrollmentId },
      include: [
        {
          model: Course,
          as: "courses",
        },
      ],
    });

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
