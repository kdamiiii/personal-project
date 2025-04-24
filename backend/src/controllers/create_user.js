import { User, Credential, UserRole } from "../models/index.js";

export const createUser = async (
  enrollment_id,
  first_name,
  last_name,
  student_id
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
    console.log(error);
    throw new Error("Error in creating user");
  }
};

export const createUserRoles = async (userId, role) => {
  try {
    const userRoles = await UserRole.create({
      userId,
      role,
    });

    return userRoles;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error in creating user roles");
  }
};

export const createCredentials = async (username, password, userId) => {
  try {
    const credentials = await Credential.create({
      username,
      password,
      userId,
    });
    return credentials;
  } catch (error) {
    console.log(error.message);
    throw new Error("Error in creating credentails for user");
  }
};
