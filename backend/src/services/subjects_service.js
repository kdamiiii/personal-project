import { Subject } from "../models/index.js";
import { HTTPError } from "../utils/error_utils.js";

export const getSubjectsFromDB = async (
  where,
  order,
  { include = [], limit, offset, attributes }
) => {
  try {
    const subjects = await Subject.findAll({
      where,
      limit,
      offset,
      include,
      attributes,
      order,
    });

    return subjects;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const insertSubjectToDB = async ({
  subject_code,
  subject_name,
  units,
  prerequisite,
  subject_description,
  price,
  default_course,
}) => {
  try {
    const subject = await Subject.create({
      subject_code,
      subject_name,
      subject_description,
      units,
      price,
      prerequisite,
      default_course,
    });
    return subject;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const findSubjectById = async ({ subjectId }) => {
  try {
    const subject = await Subject.findByPk(subjectId);

    return subject;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const deleteSubjectFromDB = async ({ subjectId }) => {
  try {
    const subject = await Subject.findByPk(subjectId);
    if (!subject) throw new HTTPError("NotFound", "Subject Does not Exist");

    await subject.destroy();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
