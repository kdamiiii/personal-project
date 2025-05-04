import { Credential, UserRole, Role } from "../models/index.js";
import {
  addCredentialsToDB,
  getRoleByNameFromDB,
  getRolesFromDB,
  getUsersFromDB,
  addRoleToDB,
  addUserToDB,
  addUserRoleToDB,
  getUserByUsernameFromDB,
} from "../services/users_service.js";
import { buildQuery } from "../utils/filter_utils.js";
import { respondWithHttpError, HTTPError } from "../utils/error_utils.js";

//Controller done
export const createUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      student_id,
      enrollment_id = null,
    } = req.body;

    const user = await addUserToDB(
      first_name,
      last_name,
      student_id,
      enrollment_id
    );

    const credential = await addCredentialsToDB(first_name, last_name, user.id);

    console.log(credential);
    return res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
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
    console.error(error.message);
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
    console.error(error.message);
    throw new Error("Error in creating credentails for user");
  }
};

//Controller done
export const getUsers = async (req, res) => {
  try {
    const {
      name,
      email,
      orderBy = "id",
      order = "asc",
      attributes = "*",
      limit = 10,
      offset = 0,
    } = req.query;

    const filters = {
      name: {
        queryString: name,
        fields: ["first_name", "last_name"],
      },
      email,
    };

    const allowedAttributes = [
      "first_name",
      "last_name",
      "email",
      "student_id",
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
        model: Credential,
        attributes: ["username"],
      },
      {
        model: UserRole,
        attributes: ["role"],
        include: [{ model: Role, attributes: ["role"] }],
      },
    ];

    const users = await getUsersFromDB(where, orderQuery, {
      include,
      limit,
      offset,
      attributes: selectedAttributes,
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const getRoles = async (req, res) => {
  try {
    const { roleQuery } = req.query;
    if (!roleQuery) {
      const roles = await getRolesFromDB();
      res.status(200).json(roles);
    } else {
      const role = await getRoleByNameFromDB(roleQuery);
      res.status(200).json({ role });
    }
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const createRole = async (req, res) => {
  try {
    const { role: roleQuery } = req.body;
    const role = await addRoleToDB(roleQuery);

    res.status(201).json(role);
  } catch (error) {
    console.error(error.message);
    return respondWithHttpError(error, res);
  }
};

export const addRoleToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role: roleQuery } = req.body;

    if (!roleQuery)
      throw new HTTPError("ValidationError", "Missing in request body: role");

    const role = await getRoleByNameFromDB(roleQuery);

    if (!role)
      throw new HTTPError(
        "NotFoundError",
        `Role '${roleQuery}' does not exist`
      );

    const userRole = await addUserRoleToDB(userId, role.id);

    res.status(201).json(userRole);
  } catch (error) {
    console.error("ss", error.name);
    return respondWithHttpError(error, res);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { userId: username } = req.params;

    const include = [
      {
        model: UserRole,
        attributes: ["role"],
        include: [{ model: Role, attributes: ["role"] }],
      },
    ];

    const allowedAttributes = [
      "first_name",
      "last_name",
      "email",
      "student_id",
    ];

    const user = await getUserByUsernameFromDB(username, {
      include,
      attributes: allowedAttributes,
    });

    if (!user) throw new HTTPError("UserNotFound");

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return respondWithHttpError(error, res);
  }
};
