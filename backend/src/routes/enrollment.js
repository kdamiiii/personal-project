import express from "express";
import {
  EnrollmentDetails,
  ParentsDetails,
  SchoolsDetails,
  EnrollmentRequirements,
  EnrollmentCourse,
  Course,
  Subject,
} from "../models/index.js";
import {
  createUser,
  createCredentials,
  createUserRoles,
} from "../controllers/users_controller.js";
import { insertClassToDB } from "../services/classes_service.js";

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
    const ah_pending = await EnrollmentDetails.count({
      where: {
        ah_status: "PENDING",
      },
      logging: console.log,
    });

    const finance_pending = await EnrollmentDetails.count({
      where: {
        finance_status: "PENDING",
      },
      logging: console.log,
    });

    const registrar_pending = await EnrollmentDetails.count({
      where: {
        finance_status: "APPROVED",
        ah_status: "APPROVED",
        status: "PENDING",
      },
      logging: console.log,
    });

    res.status(200).json({ ah_pending, finance_pending, registrar_pending });
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

    if (modifier === "status") {
      const { student_id } = req.body;

      console.log(
        enrollmentId,
        enrollmentDetails.first_name,
        enrollmentDetails.last_name,
        student_id
      );

      const user = await createUser(
        enrollmentId,
        enrollmentDetails.first_name,
        enrollmentDetails.last_name,
        student_id
      );

      await createUserRoles(user.id, "3c90769a-cc7b-4211-b128-c813ed03cbbc");
      await createCredentials(student_id, student_id, user.id);

      /* FIND A BETTER SOLUTION FOR THIS ABOMINATION */
      const course = await EnrollmentDetails.findOne({
        where: { id: enrollmentId },
        include: [
          {
            model: Course,
            as: "courses",
          },
        ],
      });

      const courseId = course.courses[0].id;

      const courseSubject = await Course.findOne({
        where: { id: courseId },
        include: {
          model: Subject,
          attributes: [
            "id",
            "subject_name",
            "subject_description",
            "subject_code",
            "price",
            "units",
          ], // Include only the fields you need
          through: {
            attributes: [],
            where: {
              student_year: "1st", // Filter by student_year in the join table
              semester: "1st", // Filter by semester in the join table
            },
          },
          as: "CourseSubjects", // Use the alias defined in the model
        },
      });

      await courseSubject.CourseSubjects.forEach(async (subject) => {
        console.log(
          course.courses[0].course_code,
          subject.dataValues.subject_name,
          subject.dataValues.subject_code
        );
        await insertClassToDB({
          class_code: `${course.courses[0].course_code}-${subject.dataValues.subject_code}`,
          class_subject: subject.dataValues.id,
        });
      });
    }

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
