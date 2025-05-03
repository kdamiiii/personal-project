import { respondWithHttpError, HTTPError } from "../utils/error_utils.js";
import { buildQuery } from "../utils/filter_utils.js";
import {
  getCoursesFromDB,
  findCourseByIdFromDB,
  insertCourseToDB,
  getCourseSubjectsFromDB,
  createCourseSubjectToDB,
  deleteCourseSubject,
} from "../services/courses_service.js";
import { Subject, User } from "../models/index.js";

export const getCourses = async (req, res) => {
  try {
    const {
      name,
      orderBy = "id",
      order = "asc",
      attributes = "*",
      limit = 10,
      offset = 0,
    } = req.query;

    const filters = {
      name: {
        queryString: name,
        fields: ["course_name", "course_code"],
      },
    };

    const allowedAttributes = [
      "id",
      "course_name",
      "course_description",
      "course_code",
      "course_type",
      "userId",
    ];

    const { where, orderQuery, selectedAttributes } = buildQuery(
      filters,
      orderBy,
      order,
      attributes,
      allowedAttributes
    );

    const include = [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    ];

    const courses = await getCoursesFromDB(where, orderQuery, {
      include,
      limit,
      offset,
      attributes: selectedAttributes,
    });

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const include = [
      { model: User },
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
    ];

    const course = await findCourseByIdFromDB(courseId, { include });

    if (!course) throw new HTTPError("NotFound", "Course does not exist");

    res.status(200).json(course);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const createCourse = async (req, res) => {
  try {
    const user = req.user;
    const { course_name, course_type, course_code, course_description } =
      req.body;

    const course = await insertCourseToDB(user.id, {
      course_name,
      course_type,
      course_code,
      course_description,
    });

    res.status(200).json(course);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getCourseSubjects = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      name,
      year,
      semester,
      orderBy = "createdAt",
      order = "asc",
      attributes = "*",
      limit = 10,
      offset = 0,
    } = req.query;

    const filters = {
      name: {
        queryString: name,
        fields: ["subject_name", "subject_code"],
      },
    };

    const allowedAttributes = [
      "id",
      "subject_name",
      "subject_code",
      "units",
      "prerequisite",
      "subject_description",
      "price",
      "createdAt",
      "updatedAt",
      "default_course",
    ];

    const { where, orderQuery, selectedAttributes } = buildQuery(
      filters,
      orderBy,
      order,
      attributes,
      allowedAttributes
    );

    const courseSubjects = await getCourseSubjectsFromDB(
      where,
      courseId,
      orderQuery,
      year,
      semester,
      {
        limit,
        offset,
        attributes: selectedAttributes,
      }
    );

    res.status(200).json(courseSubjects.map((cs) => cs.Subject));
  } catch (error) {
    console.log(error.message);
    return respondWithHttpError(error, res);
  }
};

export const addSubjectToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { subjectId, student_year, semester } = req.body;

    const courseSubject = await createCourseSubjectToDB({
      courseId,
      subjectId,
      student_year,
      semester,
    });

    res.status(201).json(courseSubject);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const removeSubjectFromCourse = async (req, res) => {
  try {
    const { courseId, subjectId } = req.params;

    await deleteCourseSubject({ courseId, subjectId });

    return res.status(204).json({ message: "Successfully removed" });
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};
