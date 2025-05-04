import { Classes } from "../models/index.js";
import { HTTPError } from "../utils/error_utils.js";
import { updateFieldIfValid } from "../utils/filter_utils.js";

export const insertClassToDB = async ({
  class_code,
  class_subject,
  class_instructor = null,
  schedule = null,
  time_start = null,
  time_end = null,
  room = null,
}) => {
  try {
    const newClass = await Classes.create({
      class_code,
      class_subject,
      class_instructor,
      schedule,
      time_start,
      time_end,
      room,
    });

    return newClass;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchClassesFromDB = async (
  where,
  order,
  { include, limit, offset, attributes }
) => {
  try {
    const classes = await Classes.findAll({
      where,
      include,
      limit,
      offset,
      attributes,
      order,
    });

    return classes;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const fetchClassFromDB = async (classId, { include = [] }) => {
  try {
    const subjectClass = await Classes.findByPk(classId, { include });
    return subjectClass;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const updateClassInDB = async (classId, fields) => {
  try {
    const subjectClass = await Classes.findByPk(classId);

    if (!subjectClass) throw new HTTPError("NotFound", "Class does not exist");
    const updateFields = {};

    Object.entries(fields).forEach((k) => {
      updateFieldIfValid(k[0], k[1], updateFields, subjectClass[k[0]]);
    });

    if (Object.keys(updateFields).length <= 0)
      throw new HTTPError(
        "NothingToUpdate",
        "There was no field/value to update"
      );

    subjectClass.set(updateFields);
    await subjectClass.save();
    return subjectClass;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
