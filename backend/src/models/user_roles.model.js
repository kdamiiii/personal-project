import { DataTypes } from "sequelize";
import UserModel from "./portal_users.model.js";
import RoleModel from "./roles.model.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default (sequelize) => {
  const User = UserModel(sequelize);
  const Role = RoleModel(sequelize);
  return sequelize.define("User_Roles", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    role: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
    },
  });
};
