import { Credential, UserRole, Role } from "../models/index.js";
import {
  addCredentialsToDB,
  getUsersFromDB,
} from "../services/users_service.js";
import { buildQuery } from "../utils/filter_utils.js";
import { respondWithHttpError } from "../utils/error_utils.js";
import { addUserToDB } from "../services/users_service.js";

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
    console.log(error.message);
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

    const { where, orderQuery, selectedAttributes } = buildQuery(
      filters,
      orderBy,
      order,
      attributes
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
    console.log(error.message);
    return respondWithHttpError(error, res);
  }
};
