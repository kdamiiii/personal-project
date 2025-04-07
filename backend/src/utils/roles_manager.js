import { Role, User, UserRole, Credential } from "../models/index.js";

export const createRole = async (role) => {
  try {
    const user = await Role.create({ role });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignRole = async (username, role) => {
  try {
    const user = await User.findOne({
      include: {
        model: Credential,
        where: {
          username,
        },
      },
    });

    const roleData = await Role.findOne({
      where: { role },
    });

    if (user && roleData) {
      const userRole = await UserRole.create({
        userId: user.id,
        role: roleData.id,
      });
      console.log(userRole);
      return userRole;
    } else {
      throw new Error("Incorrect Username or Role");
    }
  } catch (error) {
    throw error;
  }
};
