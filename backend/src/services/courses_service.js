import { Course, CourseSubject, Subject } from "../models/index.js";
import { HTTPError } from "../utils/error_utils.js";

export const getCoursesFromDB = async (
  where,
  order,
  { include = [], limit, offset, attributes }
) => {
  try {
    const courses = await Course.findAll({
      where,
      order: [order],
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes,
    });

    return courses;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const findCourseByIdFromDB = async (courseId, { include = [] }) => {
  try {
    const course = await Course.findOne({
      where: {
        id: courseId,
      },
      include,
    });

    return course;
  } catch (error) {
    console.error("asdadas", error.name);
    console.error(error.message);
    throw error;
  }
};

export const insertCourseToDB = async (
  userId,
  { course_name, course_type, course_code, course_description }
) => {
  try {
    if (!course_name || !course_type || !course_code)
      throw new Error("ValidationError");
    const course = await Course.create({
      course_name,
      course_type,
      course_code,
      course_description,
      userId,
    });

    return course;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getCourseSubjectsFromDB = async (
  where,
  courseId,
  order,
  year,
  semester,
  { limit, offset, attributes }
) => {
  try {
    const csWhere = { courseId };
    if (!!year) csWhere.year = year;
    if (!!semester) csWhere.semester = semester;

    const subjects = await CourseSubject.findAll({
      include: {
        where,
        model: Subject,
        attributes,
      },
      attributes: [],
      where: csWhere,
      order,
      limit,
      offset,
    });

    return subjects;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const createCourseSubjectToDB = async ({
  courseId,
  subjectId,
  student_year,
  semester,
}) => {
  try {
    const courseSubject = await CourseSubject.create({
      courseId,
      subjectId,
      student_year,
      semester,
    });

    return courseSubject;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteCourseSubject = async ({ courseId, subjectId }) => {
  try {
    const courseSubject = await CourseSubject.findOne({
      where: {
        courseId,
        subjectId,
      },
    });

    if (!courseSubject)
      throw new HTTPError("NotFound", "Course Subject not found");

    await courseSubject.destroy();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
