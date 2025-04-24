import { Classes } from "../models/index.js";

export const createNewClass = async (class_code, class_subject) => {
  try {
    const newClass = await Classes.create({
      class_code,
      class_subject,
    });

    return newClass;
  } catch (error) {
    console.log(error);
    throw new Error("Error in creating new class");
  }
};
