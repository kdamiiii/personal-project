import { User, Credential, Role, UserRole } from "../models/index.js";

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
  try {
    const users = await User.findAll({
      where,
      order: [order],
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes,
    });

    return users;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getUserByUsernameFromDB = async (
  username,
  { include = [], attributes = [] }
) => {
  try {
    const user = await User.findOne({
      attributes,
      include: [
        {
          model: Credential,
          attributes: ["username"],
          where: {
            username,
          },
        },
        ...include,
      ],
    });

    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getRolesFromDB = async () => {
  try {
    return await Role.findAll();
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getRoleByNameFromDB = async (role) => {
  try {
    return await Role.findOne({
      where: {
        role: role.toUpperCase(),
      },
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const addRoleToDB = async (roleQuery) => {
  try {
    const role = await Role.create({ role: roleQuery });
    return role;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const addUserRoleToDB = async (userId, role) => {
  try {
    const userRole = await UserRole.create({
      userId,
      role,
    });

    return userRole;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
