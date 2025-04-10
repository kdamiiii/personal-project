/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";
import UserModel from "./portal_users.model.js";

export default (sequelize) => {
  const User = UserModel(sequelize);
  return sequelize.define("Courses", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    course_description: {
      type: DataTypes.STRING,
    },
    course_code: {
      type: DataTypes.STRING,
    },
    course_type: {
      type: DataTypes.ENUM(
        "SHORT_COURSE",
        "SENIOR_HIGHSCHOOL",
        "BACCALAUREATE",
        "DIPLOMA"
      ),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  });
};
