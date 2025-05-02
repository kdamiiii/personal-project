import { User, Credential } from "../models/index.js";

export const addUserToDB = async (
  first_name,
  last_name,
  student_id,
  enrollment_id = null
) => {
  try {
    const user = await User.create({
      first_name,
      last_name,
      enrollment_id,
      student_id,
    });
    return user;
  } catch (error) {
    console.log(error.name);
    throw error;
  }
};

export const addCredentialsToDB = async (username, password, userId) => {
  try {
    const credential = await Credential.create({
      username,
      password,
      userId,
    });

    return credential;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getUsersFromDB = async (
  where,
  order,
  { include = [], limit, offset, attributes }
) => {
  const users = await User.findAll({
    where,
    order: [order],
    include,
    limit: parseInt(limit),
    offset: parseInt(offset),
    attributes,
  });

  return users;
};
