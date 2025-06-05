import { classes_attributes } from "../constants/allowed_attributes.js";
import {
  fetchClassesFromDB,
  fetchClassFromDB,
  insertClassToDB,
  updateClassInDB,
} from "../services/classes_service.js";
import { HTTPError, respondWithHttpError } from "../utils/error_utils.js";
import { buildQuery } from "../utils/filter_utils.js";
import { User, Subject } from "../models/index.js";

export const createClass = async (req, res) => {
  try {
    const {
      class_code,
      class_subject,
      class_instructor = null,
      schedule = null,
      time_start = null,
      time_end = null,
      room = null,
    } = req.body;

    const newClass = await insertClassToDB({
      class_code,
      class_subject,
      class_instructor,
      schedule,
      time_start,
      time_end,
      room,
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getClasses = async (req, res) => {
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
      class_code: name,
    };

    const { where, orderQuery, selectedAttributes } = buildQuery(
      filters,
      orderBy,
      order,
      attributes,
      classes_attributes
    );

    const include = [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
      },
      {
        model: Subject,
        attributes: ["id", "subject_name", "subject_code", "units"],
      },
    ];

    const classes = await fetchClassesFromDB(where, orderQuery, {
      include,
      limit,
      offset,
      attributes: selectedAttributes,
    });

    res.status(200).json(classes);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getClassById = async (req, res) => {
  try {
    const { classId } = req.params;

    const include = [
      {
        model: User,
        attributes: ["id", "first_name", "last_name"],
      },
      {
        model: Subject,
        attributes: ["id", "subject_name", "subject_code", "units"],
      },
    ];

    const subjectClass = await fetchClassFromDB(classId, { include });

    if (!subjectClass) throw new HTTPError("NotFound", "Class does not exist");

    res.status(200).json(subjectClass);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const updateClassById = async (req, res) => {
  try {
    const { classId } = req.params;
    const {
      class_instructor = null,
      schedule = null,
      time_start = null,
      time_end = null,
      room = null,
    } = req.body;

    console.log(time_start, time_end);

    const classSubect = await updateClassInDB(classId, {
      class_instructor,
      schedule,
      time_start,
      time_end,
      room,
    });

    res.status(201).json({
      class_id: classSubect.id,
      message: "Successfully updated class",
    });
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};
