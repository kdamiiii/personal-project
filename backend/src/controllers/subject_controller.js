import { subject_attributes } from "../constants/allowed_attributes.js";
import {
  deleteSubjectFromDB,
  findSubjectById,
  getSubjectsFromDB,
  insertSubjectToDB,
} from "../services/subjects_service.js";
import { HTTPError, respondWithHttpError } from "../utils/error_utils.js";
import { buildQuery } from "../utils/filter_utils.js";

export const getSubjects = async (req, res) => {
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
        fields: ["subject_name", "subject_code"],
      },
    };

    const { where, orderQuery, selectedAttributes } = buildQuery(
      filters,
      orderBy,
      order,
      attributes,
      subject_attributes
    );

    const subjects = await getSubjectsFromDB(where, orderQuery, {
      limit,
      offset,
      attributes: selectedAttributes,
    });

    console.log(subjects);

    res.status(200).json(subjects);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const createSubject = async (req, res) => {
  try {
    const {
      subject_code,
      subject_name,
      subject_description,
      units,
      price,
      prerequisite = null,
      default_course = null,
    } = req.body;

    const subject = await insertSubjectToDB({
      subject_code,
      subject_name,
      subject_description,
      units,
      price,
      prerequisite,
      default_course,
    });

    res.status(201).json(subject);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await findSubjectById({ subjectId });

    if (!subject) throw new HTTPError("NotFound", "Subject Not found");

    res.status(200).json(subject);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    await deleteSubjectFromDB({ subjectId });

    res.status(204).json({ message: "successfully deleted" });
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};
