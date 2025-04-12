/* eslint-disable import/no-anonymous-default-export */
import { DataTypes } from "sequelize";
import SubjectModel from "./subjects.model.js";
import UserModel from "./portal_users.model.js";

export default (sequelize) => {
  return sequelize.define("Classes", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    class_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    class_subject: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SubjectModel(sequelize),
        key: "id",
      },
    },
    class_instructor: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel(sequelize),
        key: "id",
      },
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
